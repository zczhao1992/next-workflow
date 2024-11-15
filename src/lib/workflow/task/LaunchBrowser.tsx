/**
 * 节点工具-新建标签页
 *
 */

import { GlobeIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "新建标签页",
  icon: (props) => <GlobeIcon className="stroke-pink-400" {...props} />,
  isEntryPoint: true,
  credits: 0,
  inputs: [
    {
      label: "新建标签页 URL",
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "例如: https://www.baidu.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      label: "页面",
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
