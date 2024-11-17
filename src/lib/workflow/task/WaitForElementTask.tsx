import { EyeIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "等待元素",
  icon: (props) => <EyeIcon className="stroke-amber-400" {...props} />,
  isEntryPoint: false,
  credits: 0,
  inputs: [
    {
      name: "Web page",
      label: "页面",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      label: "选择器",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Visibility",
      label: "可见度",
      type: TaskParamType.SELECT,
      required: true,
      hideHandle: true,
      options: [
        { label: "可见", value: "visible" },
        { label: "隐藏", value: "hidden" },
      ],
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      label: "页面",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
