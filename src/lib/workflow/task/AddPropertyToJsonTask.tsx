import { DatabaseIcon } from "lucide-react";

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "存储JSON数据",
  icon: (props) => <DatabaseIcon className="stroke-orange-400" {...props} />,
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
    {
      name: "Property value",
      label: "值",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Updated JSON",
      label: "新JSON",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
