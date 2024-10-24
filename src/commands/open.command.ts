import { Command } from "commander";
import path from "path";

const openCommand = new Command("open")
  .description("Open the overview HTML page of snapshots")
  .action(async () => {
    try {
      const open = await import("open").then((mod) => mod.default);
      const rootPath = path.resolve(process.cwd()) as string;
      const htmlPath = path.join(`${rootPath}/.viewsnap`, "snapshots.html");
      await open(htmlPath);
    } catch (error) {
      console.error(`Error opening overview HTML page: ${error}`);
      process.exit(1);
    }
  });

export default openCommand;
