"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowSchema,
  type createWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("数据错误");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("创建失败");
  }

  redirect(`/workflow/editor/${result.id}`);
}
