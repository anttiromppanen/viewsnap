import fs from "fs";
import {
  convertImagesToRelativePath,
  getRelativeImagePathsByBrowserType,
  readAllImagesFromImgFolder,
} from "../utils/filepathUtils";

import "../styles/index.css";
import { BrowserType, ViewportType } from "../types/global";
import { extractDimensionsFromPath } from "../utils/stringUtils";

export default async function generateSnapshotsPage(
  imagesPath: string,
  outputPath: string,
  title = "Snapshots",
) {
  // Function to create HTML structure
  const generateHTML = (
    imageFiles: Record<ViewportType, Record<BrowserType, string[]>>,
  ) => {
    const htmlTemplateStart = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 0 20px; }
          img { height: 500px; width: 100%; border-radius: 10px; box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2); }
          .container { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
          .overlay { position: fixed; top: 0; left: 0; width: 100%; min-height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; visibility: hidden; }
          .input-container { display: flex; gap: 0 10px; margin-bottom: 20px; }
          .image-wrapper { display: flex; flex-direction: column; }
          .image-container { position: relative; text-align: center; border-radius: 10px; margin-bottom: 80px; }
          .image-text { position: absolute; bottom: 0; left: 0; visibility: hidden; width: calc(100% - 10px); background-color: rgba(0, 0, 0, 0.4); color: white; padding: 10px 5px; border-radius: 0 0 10px 10px; }
          .image-container:hover .image-text { visibility: visible; }
          .browser-text { text-align: center; font-size: 1.5rem; margin-bottom: 30px; }
          .desktop-images { visibility: visible;}
          .tablet-images { visibility: visible;}
          .tablet-images img { height: 1066px; }
          .mobile-images { visibility: visible;}
          .mobile-images img { width: 400px; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <div class="overlay">test</div>
        <h2>${title}</h2>
        <div class="input-container">
          <select id="device-group-select">
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div class="container">
    `;

    const htmlTemplateEnd = `
        </div>
      </body>
      </html>
    `;

    const desktopImagesHtml = Object.entries(imageFiles.desktop)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper desktop-images">
            <h3 class="browser-text">${browser}</h3>
            <div>
              ${images
                .map((file: string) => {
                  return `
                    <div class="image-container">
                      <img src="${file}" alt="${file}" />
                      <div class="image-text">${file.replace(".png", "")}</div>
                    </div>
                  `;
                })
                .join("\n")}
            </div>
          </article>
        `;
      })
      .join("\n");

    const tabletImagesHtml = Object.entries(imageFiles.tablet)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper tablet-images">
            <h3 class="browser-text">${browser}</h3>
            <div>
              ${images
                .map((file: string) => {
                  return `
                    <div class="image-container">
                      <img src="${file}" alt="${file}" />
                      <div class="image-text">${file.replace(".png", "")}</div>
                    </div>
                  `;
                })
                .join("\n")}
            </div>
          </article>
        `;
      })
      .join("\n");

    const mobileImagesHtml = Object.entries(imageFiles.mobile)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper mobile-images">
            <h3 class="browser-text">${browser}</h3>
            <div>
              ${images
                .map((file: string) => {
                  const { width, height } = extractDimensionsFromPath(file);
                  return `
                    <div class="image-container">
                      <img src="${file}" alt="${file}" style="width: ${width}px; height: ${height}px;" />
                      <div class="image-text">${file.replace(".png", "")}</div>
                    </div>
                  `;
                })
                .join("\n")}
            </div>
          </article>
        `;
      })
      .join("\n");

    // Return the full HTML content
    return (
      htmlTemplateStart +
      desktopImagesHtml +
      tabletImagesHtml +
      mobileImagesHtml +
      htmlTemplateEnd
    );
  };
  // Async operation to read the directory and generate the HTML
  try {
    const {
      desktop: desktopRelativeImagePaths,
      tablet: tabletRelativeImagePaths,
      mobile: mobileRelativeImagePaths,
    } = await readAllImagesFromImgFolder(imagesPath);

    const desktopImages = getRelativeImagePathsByBrowserType(
      desktopRelativeImagePaths,
      "desktop",
    );
    const tabletImages = getRelativeImagePathsByBrowserType(
      tabletRelativeImagePaths,
      "tablet",
    );
    const mobileImages = getRelativeImagePathsByBrowserType(
      mobileRelativeImagePaths,
      "mobile",
    );

    const images = {
      desktop: desktopImages,
      tablet: tabletImages,
      mobile: mobileImages,
    };

    const htmlContent = generateHTML(images);

    await fs.promises.writeFile(outputPath, htmlContent);
    console.log(`HTML file has been generated at: ${outputPath}`);
  } catch (err) {
    console.error("Error generating snapshots page:", err);
  }
}
