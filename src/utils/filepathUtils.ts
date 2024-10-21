import fs from "fs";
import { BrowserType, ViewportType } from "../types/global";

export async function readAllImagesFromImgFolder(imagesPath: string) {
  // Chromium images
  const chromiumDesktopFiles = await fs.promises.readdir(
    `${imagesPath}/chromium/desktop`,
  );
  const chromiumTabletFiles = await fs.promises.readdir(
    `${imagesPath}/chromium/tablet`,
  );
  const chromiumMobileFiles = await fs.promises.readdir(
    `${imagesPath}/chromium/mobile`,
  );

  // Firefox images
  const firefoxDesktopFiles = await fs.promises.readdir(
    `${imagesPath}/firefox/desktop`,
  );
  const firefoxTabletFiles = await fs.promises.readdir(
    `${imagesPath}/firefox/tablet`,
  );
  const firefoxMobileFiles = await fs.promises.readdir(
    `${imagesPath}/firefox/mobile`,
  );

  // Webkit images
  const webkitDesktopFiles = await fs.promises.readdir(
    `${imagesPath}/webkit/desktop`,
  );
  const webkitTabletFiles = await fs.promises.readdir(
    `${imagesPath}/webkit/tablet`,
  );
  const webkitMobileFiles = await fs.promises.readdir(
    `${imagesPath}/webkit/mobile`,
  );

  return {
    desktop: {
      chromium: chromiumDesktopFiles,
      firefox: firefoxDesktopFiles,
      webkit: webkitDesktopFiles,
    },
    tablet: {
      chromium: chromiumTabletFiles,
      firefox: firefoxTabletFiles,
      webkit: webkitTabletFiles,
    },
    mobile: {
      chromium: chromiumMobileFiles,
      firefox: firefoxMobileFiles,
      webkit: webkitMobileFiles,
    },
  };
}

export function convertImagesToRelativePath(
  images: string[],
  relativePath: string,
) {
  return images
    .filter((file) => file.endsWith(".png"))
    .map((file) => `${relativePath}/${file}`)
    .sort(); // Filter for PNG files
}

export function getRelativeImagePathsByBrowserType(
  images: Record<BrowserType, string[]>,
  viewport: ViewportType,
) {
  const chromiumImages = convertImagesToRelativePath(
    images.chromium,
    `img/chromium/${viewport}`,
  );
  const firefoxImages = convertImagesToRelativePath(
    images.firefox,
    `img/firefox/${viewport}`,
  );
  const webkitImages = convertImagesToRelativePath(
    images.webkit,
    `img/webkit/${viewport}`,
  );

  return {
    chromium: chromiumImages,
    firefox: firefoxImages,
    webkit: webkitImages,
  };
}
