import puppeteer from "puppeteer";

import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";
import { ExecutionEnvironment } from "@/types/executor";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch({
      headless: false,
      // executablePath: "/path/to/Chrome",
      // defaultViewport: {
      //   width: 1920,
      //   height: 1080,
      // },
    });

    environment.setBrowser(browser);
    environment.log.info("新标签页打开成功");

    const page = await browser.newPage();

    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`已打开: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
