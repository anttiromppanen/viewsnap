import fs from "fs";
import {
  convertImagesToRelativePath,
  readAllImagesFromImgFolder,
} from "../utils/filepathUtils";

type ImageFilesType = {
  [key in "chromium" | "firefox" | "webkit"]: string[];
};

export default async function generateSnapshotsPage(
  imagesPath: string,
  outputPath: string,
  title = "Snapshots",
) {
  // Function to create HTML structure
  const generateHTML = (imageFiles: ImageFilesType) => {
    const htmlTemplateStart = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 0 20px; }
          img { height: 500px; width: 100%; margin-bottom: 20px; border-radius: 10px; }
          .container { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
          .overlay { position: fixed; top: 0; left: 0; width: 100%; min-height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; visibility: hidden; }
          .input-container { display: flex; gap: 0 10px; margin-bottom: 20px; }
          .image-wrapper { display: flex; flex-direction: column; }
          .image-container { position: relative; overflow: hidden; text-align: center; border-radius: 10px; }
          .image-text { position: absolute; bottom: 24px; left: 0; visibility: hidden; width: calc(100% - 10px); background-color: rgba(0, 0, 0, 0.2); color: white; padding: 10px 5px; border-radius: 0 0 10px 10px; }
          .image-container:hover .image-text { visibility: visible; }
          .browser-text { padding-left: 10px; }
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

    const imageTags = Object.entries(imageFiles)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper">
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

    // Return the full HTML content
    return htmlTemplateStart + imageTags + htmlTemplateEnd;
  };
  // Async operation to read the directory and generate the HTML
  try {
    const {
      chromiumDesktopFiles,
      chromiumMobileFiles,
      chromiumTabletFiles,
      firefoxDesktopFiles,
      firefoxMobileFiles,
      firefoxTabletFiles,
      webkitDesktopFiles,
      webkitMobileFiles,
      webkitTabletFiles,
    } = await readAllImagesFromImgFolder(imagesPath);

    const chromiumDesktopImages = convertImagesToRelativePath(
      chromiumDesktopFiles,
      "img/chromium/desktop",
    );
    const firefoxDesktopImages = convertImagesToRelativePath(
      firefoxDesktopFiles,
      "img/firefox/desktop",
    );
    const webkitDesktopImages = convertImagesToRelativePath(
      webkitDesktopFiles,
      "img/webkit/desktop",
    );

    const desktopImages = {
      chromium: chromiumDesktopImages,
      firefox: firefoxDesktopImages,
      webkit: webkitDesktopImages,
    };

    const htmlContent = generateHTML(desktopImages);

    await fs.promises.writeFile(outputPath, htmlContent);
    console.log(`HTML file has been generated at: ${outputPath}`);
  } catch (err) {
    console.error("Error generating snapshots page:", err);
  }
}
