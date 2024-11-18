"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { periodToDateRange } from "@/lib/helper/dates";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow";

const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function getStatsCardsValues(period: Period) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  const dateRange = periodToDateRange(period);

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: { in: [COMPLETED, FAILED] },
    },
    select: {
      creditsConsumed: true,
      phases: {
        where: {
          creditsConsumed: { not: null },
        },
        select: { creditsConsumed: true },
      },
      status: true,
    },
  });

  const stats = {
    workflowExecutions: executions.length,
    successExecutions: 0,
    phaseExecutions: 0,
  };

  stats.successExecutions = executions.reduce((sum, execution) => {
    if (execution.status === WorkflowExecutionStatus.COMPLETED) {
      sum += 1;
    }
    return sum;
  }, 0);

  stats.phaseExecutions = executions.reduce(
    (sum, execution) => sum + execution.phases.length,
    0
  );

  return stats;
}
