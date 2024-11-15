"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
    include: {
      //   logs: {
      //     orderBy: {
      //       timestamp: "asc",
      //     },
      //   },
    },
  });
}
