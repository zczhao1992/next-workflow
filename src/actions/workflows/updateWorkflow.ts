"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账号错误");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("未找到工作流");
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("工作流已发布");
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
}
