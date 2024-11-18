import { NavigateUrlTask } from "@/lib/workflow/task/NavigateUrlTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error("i输入框->URL未找到");
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`访问 ${url}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
