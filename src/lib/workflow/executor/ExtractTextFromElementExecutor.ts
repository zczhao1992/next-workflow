import * as cheerio from "cheerio";

import { ExtractTextFromElementTask } from "@/lib/workflow/task/ExtractTextFromElementTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("选择器未找到");
      return false;
    }
    const html = environment.getInput("HTML");
    if (!html) {
      environment.log.error("HTML未找到");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("元素未找到");
      return false;
    }

    const extractedText = $.text(element);

    if (!extractedText) {
      environment.log.error("元素没有文本");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
