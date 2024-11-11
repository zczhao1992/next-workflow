"use client";

import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { updateWorkflow } from "@/actions/workflows/updateWorkflow";

export default function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("工作流保存成功", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("保存失败", { id: "save-workflow" });
    },
  });

  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());

        toast.loading("正在保存...", { id: "save-workflow" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <CheckIcon size={16} className="stroke-blue-400" />
      保存
    </Button>
  );
}
