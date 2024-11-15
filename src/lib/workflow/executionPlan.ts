import { Edge } from "@xyflow/react";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";

// 工作流验证错误枚举
export enum FlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT", // 没有入口点错误
  "INVALID_INPUTS", // 无效输入错误
}

// 工作流执行计划返回类型
type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan; // 执行计划
  error?: {
    type: FlowToExecutionPlanValidationError; // 错误类型
    invalidElements?: AppNodeMissingInputs[]; // 无效的节点元素
  };
};

/**
 * 将流程图转换为执行计划
 * @param nodes 节点数组
 * @param edges 边缘连接数组
 * @returns 执行计划或错误信息
 */
export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  // 查找触发器节点（入口点）
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  // 如果没有找到入口点，返回错误
  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  // 存储输入验证错误的节点
  const inputsWithErrors: AppNodeMissingInputs[] = [];
  // 已规划的节点ID集合
  const planned = new Set<string>();

  // 验证入口点的输入是否有效
  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);

  // 如果入口点有无效输入，添加到错误集合
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({ nodeId: entryPoint.id, inputs: invalidInputs });
  }

  // 初始化执行计划，将入口点添加为第一阶段
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  // 将入口点标记为已规划
  planned.add(entryPoint.id);

  // 遍历所有节点，构建执行计划的后续阶段
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    // 创建新的执行阶段
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    // 遍历所有节点
    for (const currentNode of nodes) {
      // 跳过已规划的节点
      if (planned.has(currentNode.id)) continue;

      // 检查当前节点的输入是否有效
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        // 获取当前节点的所有前置节点
        const incomers = getIncomers(currentNode, nodes, edges);

        // 如果所有前置节点都已规划但仍有无效输入，记录错误
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.error("节点输入验证错误", currentNode.id, invalidInputs);
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue; // 跳过当前节点，等待前置节点处理
        }
      }

      // 将当前节点添加到下一执行阶段
      nextPhase.nodes.push(currentNode);
    }

    // 将本阶段所有节点标记为已规划
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }

    // 将当前阶段添加到执行计划中
    executionPlan.push(nextPhase);
  }

  // 如果存在输入错误，返回错误信息
  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
  }

  // 返回完整的执行计划
  return { executionPlan };
}

/**
 * 验证节点输入的有效性
 * @param node 当前节点
 * @param edges 所有边缘连接
 * @param planned 已规划的节点集合
 * @returns 无效输入的名称数组
 */
function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  // 遍历节点的所有输入
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    // 如果已提供输入值，继续检查下一个输入
    if (inputValueProvided) {
      continue;
    }

    // 查找连接到当前输入的边
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    // 检查必需输入是否由已访问的输出节点提供
    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    // 验证输入的有效性
    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }

    // 添加无效的输入
    invalidInputs.push(input.name);
  }

  return invalidInputs;
}

/**
 * 获取节点的所有前置节点
 * @param node 当前节点
 * @param nodes 所有节点
 * @param edges 所有连接
 * @returns 前置节点数组
 */
function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }

  // 收集所有指向当前节点的源节点ID
  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });

  // 返回所有前置节点
  return nodes.filter((n) => incomersIds.has(n.id));
}
