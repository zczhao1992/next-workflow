/**
 * 组件注册表
 *
 */

import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

import { LaunchBrowserTask } from "./LaunchBrowser";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
};
