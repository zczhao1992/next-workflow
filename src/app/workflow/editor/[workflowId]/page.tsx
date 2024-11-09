import { auth } from "@clerk/nextjs/server";

import Editor from "../../_components/Editor";

import prisma from "@/lib/prisma";

export default async function EditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;

  const { userId } = auth();

  if (!userId) {
    return <div>账户错误</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>工作流未找到</div>;
  }

  return <Editor workflow={workflow} />;
}
