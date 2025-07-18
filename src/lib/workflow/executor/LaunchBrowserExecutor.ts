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
      executablePath: (await chromium.executablePath()) || "/tmp/chromium",
      headless: true,
      ignoreDefaultArgs: [
        "--disable-extensions",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
      ],
    });

    environment.setBrowser(browser as any);
    environment.log.info("新标签页打开成功");

    const page = await browser.newPage();

    page.setUserAgent(
      "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36"
    );

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
