"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("执行开始", { id: workflowId });
    },
    onError: () => {
      toast.error("执行错误", { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("正在运行...", { id: workflowId });
        mutation.mutate({ workflowId });
      }}
    >
      <PlayIcon size={16} />
      运行
    </Button>
  );
}
