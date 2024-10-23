#!/bin/env node
import path from "path";
import { viewportsToSnapshots } from "./service/viewportsToSnapshots";
import generateHtmlFromImagePaths from "./service/createHtml";

async function generateHtmlPage() {
  const pageTitle = "Viewport Snapshots";

  const rootPath = path.resolve(process.cwd());
  const imagesPath = path.resolve(rootPath, ".viewsnap/img/");
  const outputHtmlPath = path.join(`${rootPath}/.viewsnap`, "snapshots.html");

  // Call the function to generate the HTML page
  generateHtmlFromImagePaths(imagesPath, outputHtmlPath, pageTitle);
}

async function run() {
  const rootPath = path.resolve(process.cwd()) as string;
  console.time("Time taken to generate snapshots");
  await viewportsToSnapshots(rootPath, "http://localhost:8080");
  console.timeEnd("Time taken to generate snapshots");

  await generateHtmlPage();
}

run();
