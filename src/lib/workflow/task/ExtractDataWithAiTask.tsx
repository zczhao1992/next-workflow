import { BrainIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const ExtractDataWithAiTask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "AI提取数据",
  icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 0,
  inputs: [
    {
      name: "Content",
      label: "内容",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      label: "凭证",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      label: "提示词",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      label: "提取数据",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
