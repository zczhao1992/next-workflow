import { TextIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "获取文本",
  icon: (props) => <TextIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 0,
  inputs: [
    {
      name: "HTML",
      label: "HTML",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      label: "选择器",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Extracted text",
      label: "选取元素",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
