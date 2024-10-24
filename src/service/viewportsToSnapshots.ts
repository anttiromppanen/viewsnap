import { chromium } from "playwright-chromium";
import { firefox } from "playwright-firefox";
import { webkit } from "playwright-webkit";
import {
  DESKTOP_VIEWPORT_SIZES,
  MOBILE_VIEWPORT_SIZES,
  TABLET_VIEWPORT_SIZES,
} from "../const/viewportSizes";
import { createAllViewportSnapshotsForBrowser } from "../utils/browserUtils";

async function initializeLoaders() {
  const yoctoSpinner = await import("yocto-spinner").then((mod) => mod.default);
  const chromiumLoader = yoctoSpinner({
    text: "Creating Chromium snapshots",
    color: "blue",
  });
  const firefoxLoader = yoctoSpinner({
    text: "Creating Firefox snapshots",
    color: "blue",
  });
  const webkitLoader = yoctoSpinner({
    text: "Creating Webkit snapshots\n",
    color: "blue",
  });

  return { chromiumLoader, firefoxLoader, webkitLoader };
}

export async function viewportsToSnapshots(
  rootPath: string,
  url: string,
  fullHeight: boolean,
) {
  const desktopViewports = Object.values(DESKTOP_VIEWPORT_SIZES);
  const tabletViewports = Object.values(TABLET_VIEWPORT_SIZES);
  const mobileViewports = Object.values(MOBILE_VIEWPORT_SIZES);

  // Initialize browsers
  const chromiumBrowser = await chromium.launch();
  const firefoxBrowser = await firefox.launch();
  const webkitBrowser = await webkit.launch();

  const { chromiumLoader, firefoxLoader, webkitLoader } =
    await initializeLoaders();

  console.log("\nGenerating snapshots for all viewports...\n");
  fullHeight && console.log("- Full height screenshots option enabled\n");
  chromiumLoader.start();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    chromiumBrowser,
    "chromium",
    fullHeight,
  );

  chromiumLoader.success();
  chromiumBrowser.close();

  firefoxLoader.start();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    firefoxBrowser,
    "firefox",
    fullHeight,
  );

  firefoxLoader.success();
  firefoxBrowser.close();

  webkitLoader.start();

  await createAllViewportSnapshotsForBrowser(
    desktopViewports,
    tabletViewports,
    mobileViewports,
    rootPath,
    url,
    webkitBrowser,
    "webkit",
    fullHeight,
  );

  webkitLoader.success();
  webkitBrowser.close();
}
