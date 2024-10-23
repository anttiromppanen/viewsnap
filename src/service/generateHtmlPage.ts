import path from "path";
import generateHtmlFromImagePaths from "./createHtml";

export default async function generateHtmlPage(fullHeight: boolean) {
  const pageTitle = "Viewport Snapshots";

  const rootPath = path.resolve(process.cwd());
  const imagesPath = path.resolve(rootPath, ".viewsnap/img/");
  const outputHtmlPath = path.join(`${rootPath}/.viewsnap`, "snapshots.html");

  // Call the function to generate the HTML page
  generateHtmlFromImagePaths(imagesPath, outputHtmlPath, pageTitle, fullHeight);
}
