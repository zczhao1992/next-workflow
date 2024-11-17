"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import parser from "cron-parser";

import prisma from "@/lib/prisma";

export async function updateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  try {
    const interval = parser.parseExpression(cron, { utc: true });

    await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.error("表达式错误:", error.message);
    throw new Error("表达式无效");
  }

  revalidatePath("/workflows");
}
