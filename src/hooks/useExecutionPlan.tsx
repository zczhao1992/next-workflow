import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from "@/lib/workflow/executionPlan";

import useFlowValidation from "@/hooks/useFlowValidation";
import { AppNode } from "@/types/appNode";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error?.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("没找到触发器");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("输入值不可为空");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error("错误！");
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
