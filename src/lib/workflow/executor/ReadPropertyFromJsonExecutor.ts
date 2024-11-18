import { ReadPropertyFromJsonTask } from "@/lib/workflow/task/ReadPropertyFromJsonTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("输入框->JSON未找到");
    }

    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("输入框->名称未找到");
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];
    if (propertyValue === undefined) {
      environment.log.error("值未找到");
      return false;
    }

    environment.setOutput("Property value", propertyValue);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
