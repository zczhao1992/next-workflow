// import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";
import { ExecutionEnvironment } from "@/types/executor";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
    });

    environment.setBrowser(browser as any);
    environment.log.info("新标签页打开成功");

    const page = await browser.newPage();

    page.setViewport({ width: 2560, height: 1440 });

    await page.goto(websiteUrl);
    environment.setPage(page as any);
    environment.log.info(`已打开: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
