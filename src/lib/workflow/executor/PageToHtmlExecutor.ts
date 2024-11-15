import { PageToHtmlTask } from "@/lib/workflow/task/PageToHtml";
import { ExecutionEnvironment } from "@/types/executor";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
