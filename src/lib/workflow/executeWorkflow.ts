import "server-only";
import { revalidatePath } from "next/cache";
import { ExecutionPhase } from "@prisma/client";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";

import prisma from "@/lib/prisma";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutorRegistry } from "@/lib/workflow/executor/registry";
import { createLogCollector } from "@/lib/log";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow";
import { AppNode } from "@/types/appNode";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { TaskParamType } from "@/types/task";
import { LogCollector } from "@/types/log";

/**
 * 执行工作流程
 * @param executionId 执行ID
 * @param nextRunAt 下次运行时间（可选）
 */
export async function ExecuteWorkflow(executionId: string, nextRunAt?: Date) {
  // 获取工作流执行实例及其相关数据
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: { workflow: true, phases: true },
  });

  if (!execution) {
    throw new Error("执行流程未找到");
  }

  // 解析工作流定义中的连接
  const edges = JSON.parse(execution.definition).edges as Edge[];

  // 初始化执行环境
  const environment: Environment = { phases: {} };

  // 初始化工作流执行状态
  await initializeWorkflowExecution(
    execution.id,
    execution.workflowId,
    nextRunAt
  );
  await initializePhaseStatuses(execution);

  // 执行各个阶段并跟踪消耗的积分
  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
      execution.userId
    );

    creditsConsumed += phaseExecution.creditsConsumed;

    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  // 完成工作流执行并清理环境
  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );
  await cleanupEnvironment(environment);

  // 重新验证工作流运行页面
  revalidatePath("/workflow/runs");
}

/**
 * 初始化工作流执行状态
 * @param executionId 执行ID
 * @param workflowId 工作流ID
 * @param nextRunAt 下次运行时间
 */
async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string,
  nextRunAt?: Date
) {
  // 更新执行状态为运行中
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  // 更新工作流最后运行信息
  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
      ...(nextRunAt && { nextRunAt }),
    },
  });
}

/**
 * 初始化所有执行阶段的状态
 * @param execution 工作流执行实例
 */
async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
}

/**
 * 完成工作流执行
 * @param executionId 执行ID
 * @param workflowId 工作流ID
 * @param executionFailed 是否执行失败
 * @param creditsConsumed 消耗的积分
 */
async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) {
  const finalStatus = executionFailed
    ? ExecutionPhaseStatus.FAILED
    : ExecutionPhaseStatus.COMPLETED;

  // 更新执行状态和消耗的积分
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  // 更新工作流最后运行状态
  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {});
}

/**
 * 执行工作流的单个阶段
 * @param phase 执行阶段
 * @param environment 执行环境
 * @param edges 边缘连接
 * @param userId 用户ID
 */
async function executeWorkflowPhase(
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[],
  userId: string
) {
  // 创建日志收集器
  const logCollector = createLogCollector();
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  // 设置阶段的执行环境
  setupEnvironmentForPhase(node, environment, edges);

  // 更新阶段状态为运行中
  await prisma.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  // 获取所需积分并检查余额
  const creditsRequired = TaskRegistry[node.data.type].credits;

  let success = await decrementCredits(userId, creditsRequired, logCollector);
  const creditsConsumed = success ? creditsRequired : 0;

  if (success) {
    // 积分充足时执行阶段
    success = await executePhase(phase, node, environment, logCollector);
  }

  // 完成阶段执行
  const outputs = environment.phases[node.id].outputs;
  await finalizePhase(
    phase.id,
    success,
    outputs,
    logCollector,
    creditsConsumed
  );

  return { success, creditsConsumed };
}

/**
 * 完成阶段执行
 * @param phaseId 阶段ID
 * @param success 是否成功
 * @param outputs 输出结果
 * @param logCollector 日志收集器
 * @param creditsConsumed 消耗的积分
 */
async function finalizePhase(
  phaseId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector,
  creditsConsumed: number
) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  // 更新阶段状态、输出和日志
  await prisma.executionPhase.update({
    where: { id: phaseId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      creditsConsumed,
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            message: log.message,
            timestamp: log.timestamp,
            logLevel: log.level,
          })),
        },
      },
    },
  });
}

/**
 * 执行单个阶段
 * @param phase 执行阶段
 * @param node 节点信息
 * @param environment 执行环境
 * @param logCollector 日志收集器
 */
async function executePhase(
  phase: ExecutionPhase,
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): Promise<boolean> {
  // 获取执行器函数
  const runFn = ExecutorRegistry[node.data.type];

  if (!runFn) {
    logCollector.error(`未找到类型为 ${node.data.type} 的执行器`);
    return false;
  }

  // 创建执行环境并运行
  const executionEnvironment: ExecutionEnvironment<any> =
    createExecutionEnvironment(node, environment, logCollector);

  return await runFn(executionEnvironment);
}

/**
 * 设置阶段的执行环境
 * @param node 节点信息
 * @param environment 执行环境
 * @param edges 边缘连接
 */
function setupEnvironmentForPhase(
  node: AppNode,
  environment: Environment,
  edges: Edge[]
) {
  // 初始化阶段环境
  environment.phases[node.id] = { inputs: {}, outputs: {} };

  // 处理输入参数
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) continue;

    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // 从环境中的其他阶段输出获取输入值
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );

    if (!connectedEdge) {
      console.error("缺少输入边缘连接", input.name, "节点ID:", node.id);
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

/**
 * 创建执行环境
 * @param node 节点信息
 * @param environment 执行环境
 * @param logCollector 日志收集器
 */
function createExecutionEnvironment(
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): ExecutionEnvironment<any> {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },

    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),

    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),

    log: logCollector,
  };
}

/**
 * 清理执行环境
 * @param environment 执行环境
 */
async function cleanupEnvironment(environment: Environment) {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((err) => console.error("无法关闭浏览器，原因:", err));
  }
}

/**
 * 扣减用户积分
 * @param userId 用户ID
 * @param amount 积分数量
 * @param logCollector 日志收集器
 */
async function decrementCredits(
  userId: string,
  amount: number,
  logCollector: LogCollector
) {
  try {
    // await prisma.userBalanace.update({
    //   where: { userId, credits: { gte: amount } },
    //   data: { credits: { increment: amount } },
    // });

    return true;
  } catch (error) {
    logCollector.error("积分余额不足");
    return false;
  }
}
