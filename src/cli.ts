#!/bin/env node
import path from "path";
import { viewportsToSnapshots } from "./service/viewportsToSnapshots";
import createSnapshotForBrowser from "./utils/createSnapshotForBrowser";
import getProjectRootFolder from "./utils/getProjectRootFolder";
import generateSnapshotsPage from "./service/createHtml";

async function run() {
  const rootPath = (await getProjectRootFolder()) as string;
  console.time("Time taken to generate snapshots");
  await viewportsToSnapshots(rootPath, "http://localhost:5173");
  console.timeEnd("Time taken to generate snapshots");
}

async function generateHtmlTest() {
  const rootPath = (await getProjectRootFolder()) as string;
  const imagesDir = path.join(rootPath, ".viewsnap/img/");
  const outputFile = path.join(`${rootPath}/.viewsnap`, "snapshots.html");
  const pageTitle = "Viewport Snapshots";

  // Call the function to generate the HTML page
  generateSnapshotsPage(imagesDir, outputFile, pageTitle);
}

// run();
generateHtmlTest();
