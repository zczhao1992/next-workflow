import { WaitForElementTask } from "@/lib/workflow/task/WaitForElementTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("输入框->选择器未找到");
    }

    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("输入框->可见度未找到");
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });
    environment.log.info(`元素 ${selector} 变为 ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
