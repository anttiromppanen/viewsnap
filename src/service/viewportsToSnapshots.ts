import { Browser, BrowserType, chromium } from "playwright-chromium";
import { firefox } from "playwright-firefox";
import { webkit } from "playwright-webkit";
import { DimensionsType } from "../types/global";
import {
  createAllViewportSnapshotsForBrowser,
  createSnapshotForBrowser,
} from "../utils/browserUtils";
import {
  DESKTOP_VIEWPORT_SIZES,
  MOBILE_VIEWPORT_SIZES,
  TABLET_VIEWPORT_SIZES,
} from "../const/viewportSizes";

export async function viewportsToSnapshots(rootPath: string, url: string) {
  const desktopViewports = Object.values(DESKTOP_VIEWPORT_SIZES);
  const tabletViewports = Object.values(TABLET_VIEWPORT_SIZES);
  const mobileViewports = Object.values(MOBILE_VIEWPORT_SIZES);

  // Initialize browsers
  const chromiumBrowser = await chromium.launch();
  const firefoxBrowser = await firefox.launch();
  const webkitBrowser = await webkit.launch();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    chromiumBrowser,
    "chromium",
  );

  chromiumBrowser.close();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    firefoxBrowser,
    "firefox",
  );

  firefoxBrowser.close();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    webkitBrowser,
    "webkit",
  );

  webkitBrowser.close();
}
