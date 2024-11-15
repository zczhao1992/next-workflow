import { ExecutionEnvironment } from "@/types/executor";
import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

import { LaunchBrowserExecutor } from "@/lib/workflow/executor/LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "@/lib/workflow/executor/PageToHtmlExecutor";
import { ExtractTextFromElementExecutor } from "@/lib/workflow/executor/ExtractTextFromElementExecutor";

type ExecuterFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecuterFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};
