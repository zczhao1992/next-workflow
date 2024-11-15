"use client";

import { PlayIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/hooks/useExecutionPlan";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("执行开始", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("执行错误", { id: "flow-execution" });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      运行
    </Button>
  );
}
