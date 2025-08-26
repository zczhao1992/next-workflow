// import puppeteer from "puppeteer";
// import chromium from "@sparticuz/chromium";
// import puppeteerCore from "puppeteer-core";
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";
import { ExecutionEnvironment } from "@/types/executor";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    // 调用截图 API
    const response = await fetch(
      `${baseUrl}/api/screenshot?url=${encodeURIComponent(websiteUrl)}`
    );

    if (!response.ok) {
      throw new Error(`截图 API 返回错误: ${response.status}`);
    }

    const blob = await response.blob();
    const screenshotUrl = URL.createObjectURL(blob);
    environment.log.info(`Screenshot created: ${screenshotUrl}`);

    // 创建模拟的 browser 和 page 对象
    const mockBrowser = {
      newPage: async () => ({
        setViewport: (viewport: { width: number; height: number }) => {
          // 模拟设置视口
          environment.log.info(
            `设置视口: ${viewport.width}x${viewport.height}`
          );
        },
        goto: async (url: string) => {
          // 模拟页面跳转
          environment.log.info(`导航至: ${url}`);
        },
        // 添加其他可能需要的模拟方法
      }),
      close: async () => {
        // 模拟关闭浏览器
        environment.log.info("关闭浏览器");
      },
    } as any;

    const mockPage = await mockBrowser.newPage();

    // 设置浏览器和页面到执行环境
    environment.setBrowser(mockBrowser);
    environment.setPage(mockPage);

    // 设置视口并导航
    await mockPage.setViewport({ width: 2560, height: 1440 });
    await mockPage.goto(websiteUrl);

    environment.log.info("新标签页打开成功");
    environment.log.info(`已打开: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
