/**
 * 节点注册表
 *
 */

import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

import { LaunchBrowserTask } from "./LaunchBrowser";
import { ExtractTextFromElementTask } from "./ExtractTextFromElementTask";
import { PageToHtmlTask } from "./PageToHtml";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
