/**
 * 节点工具-获取页面结构
 *
 */

import { CodeIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "获取HTML",
  icon: (props) => <CodeIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 0,
  inputs: [
    {
      name: "Web page",
      label: "页面",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "HTML",
      label: "HTML",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      label: "页面",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
