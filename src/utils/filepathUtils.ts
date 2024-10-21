import fs from "fs";

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
    chromiumDesktopFiles,
    chromiumTabletFiles,
    chromiumMobileFiles,
    firefoxDesktopFiles,
    firefoxTabletFiles,
    firefoxMobileFiles,
    webkitDesktopFiles,
    webkitTabletFiles,
    webkitMobileFiles,
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
