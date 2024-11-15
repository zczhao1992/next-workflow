import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";

import Topbar from "@/app/workflow/_components/topbar/Topbar";
import ExecutionsTable from "@/app/workflow/runs/[workflowId]/_components/ExecutionsTable";

import { getWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";

export default function ExecutionsPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        hideButtons
        title="日志"
        subtitle="日志列表"
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full justify-center items-center">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await getWorkflowExecutions(workflowId);

  if (!executions) {
    return <div>无数据</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">此工作流尚未运行</p>
            <p className="text-sm text-muted-foreground">
              您可以在编辑器页面中运行
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}
