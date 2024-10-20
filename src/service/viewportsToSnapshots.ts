import { chromium } from "playwright-chromium";
import { firefox } from "playwright-firefox";
import { webkit } from "playwright-webkit";
import { DimensionsType } from "../types/global";
import createSnapshotForBrowser from "../utils/createSnapshotForBrowser";
import {
  DESKTOP_VIEWPORT_SIZES,
  MOBILE_VIEWPORT_SIZES,
  TABLET_VIEWPORT_SIZES,
} from "../const/viewportSizes";

export async function viewportsToSnapshots(rootPath: string, url: string) {
  const chromiumBrowser = await chromium.launch();
  const firefoxBrowser = await firefox.launch();
  const webkitBrowser = await webkit.launch();

  const desktopViewports = Object.values(DESKTOP_VIEWPORT_SIZES);
  const tabletViewports = Object.values(TABLET_VIEWPORT_SIZES);
  const mobileViewports = Object.values(MOBILE_VIEWPORT_SIZES);

  const snapshotPromises: Promise<void>[] = [];

  const addSnapshotPromises = (
    viewports: DimensionsType[],
    deviceType: "desktop" | "tablet" | "mobile"
  ) => {
    viewports.forEach((item) => {
      snapshotPromises.push(
        createSnapshotForBrowser(
          rootPath,
          url,
          item,
          deviceType,
          chromiumBrowser,
          "chromium"
        ),
        createSnapshotForBrowser(
          rootPath,
          url,
          item,
          deviceType,
          firefoxBrowser,
          "firefox"
        ),
        createSnapshotForBrowser(
          rootPath,
          url,
          item,
          deviceType,
          webkitBrowser,
          "webkit"
        )
      );
    });
  };

  // Add promises for desktop, tablet, and mobile
  addSnapshotPromises(desktopViewports, "desktop");
  addSnapshotPromises(tabletViewports, "tablet");
  addSnapshotPromises(mobileViewports, "mobile");

  // Run all snapshot promises concurrently
  await Promise.all(snapshotPromises);
  await chromiumBrowser.close();
  await firefoxBrowser.close();
  await webkitBrowser.close();
}
