import { AddPropertyToJsonTask } from "@/lib/workflow/task/AddPropertyToJsonTask";
import { ExecutionEnvironment } from "@/types/executor";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
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

    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("输入框->值未找到");
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(json));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
