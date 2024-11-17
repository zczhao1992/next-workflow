import { FillInputTask } from "@/lib/workflow/task/FillInputTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("输入框->选择器未找到");
    }

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("输入框->值未找到");
    }

    await environment.getPage()!.type(selector, value);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
