/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get("url");
  if (!urlParam) {
    return new NextResponse("Please provide a URL.", { status: 400 });
  }

  // Prepend http:// if missing
  let inputUrl = urlParam.trim();
  if (!/^https?:\/\//i.test(inputUrl)) {
    inputUrl = `http://${inputUrl}`;
  }

  // Validate the URL is a valid HTTP/HTTPS URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(inputUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return new NextResponse("URL must start with http:// or https://", {
        status: 400,
      });
    }
  } catch {
    return new NextResponse("Invalid URL provided.", { status: 400 });
  }

  let browser;
  try {
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer: any,
      launchOptions: any = {
        headless: true,
      };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto(parsedUrl.toString(), { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ type: "png" });
    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="screenshot.png"',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      "An error occurred while generating the screenshot.",
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
