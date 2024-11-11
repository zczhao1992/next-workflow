import { Suspense } from "react";
import { AlertCircle, InboxIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";

export default function WorkflowsPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">工作流</h1>
          <p className="text-muted-foreground">管理你的工作流</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  let workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>有点问题，稍后再尝试！</AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">目前没有工作流</p>
          <p className="text-sm text-muted-foreground">
            点击按钮创建你的第一个工作流
          </p>
        </div>
        <CreateWorkflowDialog triggerText="新建你的第一个工作流" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
