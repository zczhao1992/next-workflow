import { useContext } from "react";

import { FlowValidationContext } from "@/components/context/FlowValidationContext";

export default function useFlowValidation() {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error("useFlowValidation 必须使用 FlowValidationContext");
  }

  return context;
}
