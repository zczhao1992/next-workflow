import { ClickElementTask } from "@/lib/workflow/task/ClickElementTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function ClickElementExecutor(
  environment: ExecutionEnvironment<typeof ClickElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("输入框->选择器未找到");
    }

    await environment.getPage()!.click(selector);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
