#!/bin/env node
import path from "path";
import generateSnapshotsPage from "./service/createHtml";
import { viewportsToSnapshots } from "./service/viewportsToSnapshots";

async function generateHtmlPage() {
  const pageTitle = "Viewport Snapshots";

  const rootPath = path.resolve(process.cwd());
  const imagesPath = path.resolve(rootPath, ".viewsnap/img/");
  const outputFile = path.join(`${rootPath}/.viewsnap`, "snapshots.html");

  // Call the function to generate the HTML page
  generateSnapshotsPage(imagesPath, outputFile, pageTitle);
}

async function run() {
  const rootPath = path.resolve(process.cwd()) as string;
  console.time("Time taken to generate snapshots");
  await viewportsToSnapshots(rootPath, "http://localhost:5173");
  console.timeEnd("Time taken to generate snapshots");

  await generateHtmlPage();
}

run();
