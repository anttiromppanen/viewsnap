import { Browser } from "playwright-chromium";
import { DimensionsType } from "../types/global";

type BrowserType = "chromium" | "firefox" | "webkit";

export default async function createSnapshotForBrowser(
  rootPath: string,
  url: string,
  viewportSize: DimensionsType,
  category: "desktop" | "mobile" | "tablet",
  browser: Browser,
  browserType: BrowserType
) {
  const page = await browser.newPage();
  await page.setViewportSize(viewportSize);

  const { width, height } = viewportSize;

  await page.goto(url);
  await page.screenshot({
    path: `${rootPath}/.viewsnap/img/${browserType}/${category}/${browserType}-${width}-${height}.png`,
  });
}
