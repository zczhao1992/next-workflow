/**
 * 节点注册表
 *
 */

import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";

import { LaunchBrowserTask } from "./LaunchBrowser";
import { ExtractTextFromElementTask } from "./ExtractTextFromElementTask";
import { PageToHtmlTask } from "./PageToHtml";
import { FillInputTask } from "./FillInputTask";
import { ClickElementTask } from "./ClickElementTask";
import { WaitForElementTask } from "./WaitForElementTask";
import { DeliverViaWebhookTask } from "./DeliverViaWebhookTask";
import { ExtractDataWithAiTask } from "./ExtractDataWithAiTask";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJsonTask";
import { AddPropertyToJsonTask } from "./AddPropertyToJsonTask";
import { NavigateUrlTask } from "./NavigateUrlTask";
import { ScrollToElementTask } from "./ScrollToElementTask";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
  NAVIGATE_URL: NavigateUrlTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
};
