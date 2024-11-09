"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GetWorkflowsForUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  return await prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
