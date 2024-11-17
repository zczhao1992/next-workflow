"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function removeWorkflowSchedule(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath("/workflows");
}
