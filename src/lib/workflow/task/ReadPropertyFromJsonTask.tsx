import { FileJson2Icon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const ReadPropertyFromJsonTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "读取JSON数据",
  icon: (props) => <FileJson2Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      label: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property name",
      label: "名称",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property value",
      label: "值",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
