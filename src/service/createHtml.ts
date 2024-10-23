import fs from "fs";
import {
  getRelativeImagePathsByBrowserType,
  readAllImagesFromImgFolder,
} from "../utils/filepathUtils";

import { BrowserType, ViewportType } from "../types/global";
import { extractDimensionsFromPath } from "../utils/stringUtils";

export default async function generateHtmlFromImagePaths(
  imagesPath: string,
  outputHtmlFilepath: string,
  title = "Snapshots",
  fullHeight = false,
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
        <title>${title}</title>
        <style>
          body { font-family: "Montserrat", sans-serif; padding: 0 30px; background-color: #fdfdfd; color: #243642; }
          img { border-radius: 10px; box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2); }
          h1 { font-size: 2.5rem; }
          .container { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
          .container img { height: 500px; width: 100%; }
          #overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; max-height: 100vh; background-color: rgba(0, 0, 0, 0.8); z-index: 9999; display: none; justify-content: center; align-items: center; color: white; font-size: 24px; }
          #overlay-container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; }
          #overlay-container button { padding: 5px 10px; border-radius: 5px; font-size: 1.2rem; border: none; background-color: white; cursor: pointer; position: absolute; top: 40px; right: 40px; }
          #overlay-container h2 { position: absolute; top: 15px; left: 20px; font-size: 1.3rem; }
          #overlay img { max-width: 90%; max-height: 90%; }
          #device-group-select { padding: 10px; font-size: 1.2rem; border-radius: 5px; border: 1px solid #243642; }
          .input-container { display: flex; gap: 0 10px; margin-bottom: 20px; justify-content: center; }
          .image-wrapper { display: flex; flex-direction: column; }
          .image-container { position: relative; text-align: center; border-radius: 10px; margin-bottom: 80px; }
          .image-text { background-color: red; height: calc(100% - 3px); position: absolute; left: 0; bottom: 3px; width: 100%; color: white; display: flex; justify-content: center; align-items: center; border-radius: 10px; visibility: hidden; background-color: rgba(0, 0, 0, 0.7); }
          .image-container-two:hover .image-text { visibility: visible; }
          .browser-text { text-align: center; font-size: 1.2rem; margin-bottom: 30px; color: #387478; }
          .desktop-images { display: block; }
          .tablet-images { display: block;}
          .tablet-images img { height: 1066px; }
          .mobile-images { display: block;}
          .mobile-images img { width: 400px; }
          .mobile-images-full-height img { height: 100%; }
          .image-button { position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer; border: none; z-index: 2; background-color: transparent; }
          h1, h2 { text-align: center; }
        </style>
      </head>
      <body>
        <div id="overlay">
          <div id="overlay-container">
            <button type="button" onClick="document.getElementById('overlay').style.display = 'none'">X</button>
            <h2></h2>
            <img src="" alt="" /> 
          </div>
        </div>
        <h1>${title}</h1>
        <h2 id="active-viewports-heading">All Viewports</h2>
        <div class="input-container">
          <select id="device-group-select">
            <option value="all">All</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div class="container">
    `;

    const htmlTemplateEnd = `
        </div>
        <script>
          function handleImageButtonClick(e) {
            const overlay = document.getElementById("overlay");
            const imageSrc = e.target.value;
            
            overlay.style.display = "flex";
            overlay.querySelector("img").src = imageSrc;
            overlay.querySelector("h2").innerText = imageSrc;
          }

          document.addEventListener("DOMContentLoaded", () => {
            const deviceGroupSelect = document.getElementById("device-group-select");
            const activeViewportsHeading = document.getElementById("active-viewports-heading");

            let desktopImages = document.getElementsByClassName("desktop-images");
            let tabletImages = document.getElementsByClassName("tablet-images");
            let mobileImages = document.getElementsByClassName("mobile-images");
            
            function toggleViewportImages() {
              const selectedViewport = deviceGroupSelect.value;
              
              switch (selectedViewport) {
                case "desktop":
                  Array.from(desktopImages).forEach((image) => image.style.display = "block");
                  Array.from(tabletImages).forEach((image) => image.style.display = "none");
                  Array.from(mobileImages).forEach((image) => image.style.display = "none");
                  activeViewportsHeading.innerText = "Desktop";
                  break;
                case "tablet":
                  Array.from(desktopImages).forEach((image) => image.style.display = "none");
                  Array.from(tabletImages).forEach((image) => image.style.display = "block");
                  Array.from(mobileImages).forEach((image) => image.style.display = "none");
                  activeViewportsHeading.innerText = "Tablet";
                  break;
                case "mobile":
                  Array.from(desktopImages).forEach((image) => image.style.display = "none");
                  Array.from(tabletImages).forEach((image) => image.style.display = "none");
                  Array.from(mobileImages).forEach((image) => image.style.display = "block");
                  activeViewportsHeading.innerText = "Mobile";
                  break;
                default:
                  Array.from(desktopImages).forEach((image) => image.style.display = "block");
                  Array.from(tabletImages).forEach((image) => image.style.display = "block");
                  Array.from(mobileImages).forEach((image) => image.style.display = "block");
                  activeViewportsHeading.innerText = "All Viewports";
                  break;
              }
            }

            deviceGroupSelect.addEventListener("change", toggleViewportImages);
            toggleViewportImages();
          });
        </script>
      </body>
      </html>
    `;

    // Desktop images HTML
    const desktopImagesHtml = `
    ${Object.entries(imageFiles.desktop)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper desktop-images">
            <h3 class="browser-text">${browser}</h3>
            <div>
              ${images
                .map((file: string) => {
                  return `
                    <div class="image-container">
                      <div class="image-container-two" style="position: relative;">
                        <button type="button" class="image-button" onClick="handleImageButtonClick(event)" value=${file}></button>
                        <img src="${file}" alt="${file}" />
                        <div class="image-text">${file.replace(".png", "")}</div>
                      </div>
                    </div>
                  `;
                })
                .join("\n")}
            </div>
          </article>
        `;
      })
      .join("\n")}`;

    // Tablet images HTML
    const tabletImagesHtml = Object.entries(imageFiles.tablet)
      .map(([browser, images]) => {
        return `
          <article class="image-wrapper tablet-images">
            <h3 class="browser-text">${browser}</h3>
            <div>
              ${images
                .map((file: string) => {
                  const { height } = extractDimensionsFromPath(file);
                  return `
                    <div class="image-container">
                      <div class="image-container-two" style="position: relative;">
                        <button type="button" class="image-button" onClick="handleImageButtonClick(event)" value=${file}></button>
                        <img src="${file}" alt="${file}" style="height: ${fullHeight ? "100%" : `${height}px`};" />
                        <div class="image-text">${file.replace(".png", "")}</div>
                      </div>
                    </div>
                  `;
                })
                .join("\n")}
            </div>
          </article>
        `;
      })
      .join("\n");

    // Mobile images HTML
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
                      <div class="image-container-two" style="position: relative; width: fit-content; margin-left: auto; margin-right: auto;">
                        <button type="button" class="image-button" onClick="handleImageButtonClick(event)" value=${file}></button>
                        <img src="${file}" alt="${file}" style="width: ${width}px; height: ${fullHeight ? "100%" : `${height}px`};" />
                        <div class="image-text" style="width: ${width}px;">${file.replace(".png", "")}</div>
                      </div>
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

    await fs.promises.writeFile(outputHtmlFilepath, htmlContent);
    console.log(`HTML file has been generated at: ${outputHtmlFilepath}`);
  } catch (err) {
    console.error("Error generating snapshots page:", err);
  }
}
