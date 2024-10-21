import { Browser } from "playwright-chromium";
import { DimensionsType } from "../types/global";

type BrowserType = "chromium" | "firefox" | "webkit";

export async function createSnapshotForBrowser(
  rootPath: string,
  url: string,
  viewportSize: DimensionsType,
  category: "desktop" | "mobile" | "tablet",
  browser: Browser,
  browserType: BrowserType,
) {
  // 5 * 60 * 1000 milliseconds = 5 minutes
  const timeout = 5 * 60 * 1000;
  const page = await browser.newPage();
  await page.setViewportSize(viewportSize);

  const { width, height } = viewportSize;

  await page.goto(url, { timeout: timeout });
  await page.screenshot({
    path: `${rootPath}/.viewsnap/img/${browserType}/${category}/${browserType}-${width}-${height}.png`,
    timeout: timeout,
  });
}

export async function createAllViewportSnapshotsForBrowser(
  desktopViewports: DimensionsType[],
  tabletViewports: DimensionsType[],
  mobileViewports: DimensionsType[],
  rootPath: string,
  url: string,
  browser: Browser,
  browserType: BrowserType,
) {
  for (const viewport of desktopViewports) {
    await createSnapshotForBrowser(
      rootPath,
      url,
      viewport,
      "desktop",
      browser,
      browserType,
    );
  }

  for (const viewport of tabletViewports) {
    await createSnapshotForBrowser(
      rootPath,
      url,
      viewport,
      "tablet",
      browser,
      browserType,
    );
  }

  for (const viewport of mobileViewports) {
    await createSnapshotForBrowser(
      rootPath,
      url,
      viewport,
      "mobile",
      browser,
      browserType,
    );
  }
}
