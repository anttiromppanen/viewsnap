import { Command } from "commander";
import path from "path";
import { viewportsToSnapshots } from "../service/viewportsToSnapshots";
import generateHtmlPage from "../service/generateHtmlPage";

const generateCommand = new Command("generate")
  .description("Generate snapshots for url and overview HTML page of snapshots")
  .argument("<url>", "URL to generate snapshots for")
  .option("-f, --full-height", "Take full height screenshots for each viewport")
  .action(async (url: string, options: { fullHeight: boolean }) => {
    const rootPath = path.resolve(process.cwd()) as string;
    console.time("Time taken to generate snapshots");
    await viewportsToSnapshots(rootPath, url, options.fullHeight);
    console.timeEnd("Time taken to generate snapshots");

    await generateHtmlPage(options.fullHeight);
  });

export default generateCommand;
