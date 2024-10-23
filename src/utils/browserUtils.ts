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
  fullHeight: boolean,
) {
  // 2 * 60 * 1000 milliseconds = 2 minutes
  const timeout = 2 * 60 * 1000;
  const page = await browser.newPage();
  await page.setViewportSize(viewportSize);

  const { width, height } = viewportSize;

  await page.goto(url, { timeout: timeout });
  await page.screenshot({
    path: `${rootPath}/.viewsnap/img/${browserType}/${category}/${browserType}-${width}-${height}.png`,
    timeout: timeout,
    animations: "disabled",
    fullPage: fullHeight,
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
  fullHeight: boolean,
) {
  const promises = [];

  for (const viewport of desktopViewports) {
    promises.push(
      createSnapshotForBrowser(
        rootPath,
        url,
        viewport,
        "desktop",
        browser,
        browserType,
        fullHeight,
      ),
    );
  }

  for (const viewport of tabletViewports) {
    promises.push(
      createSnapshotForBrowser(
        rootPath,
        url,
        viewport,
        "tablet",
        browser,
        browserType,
        fullHeight,
      ),
    );
  }

  for (const viewport of mobileViewports) {
    promises.push(
      createSnapshotForBrowser(
        rootPath,
        url,
        viewport,
        "mobile",
        browser,
        browserType,
        fullHeight,
      ),
    );
  }

  await Promise.all(promises);
}
