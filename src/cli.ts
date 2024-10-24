#!/bin/env node

import { Command } from "commander";
import path from "path";
import generateCommand from "./commands/generate.command";
import generateHtmlPage from "./service/generateHtmlPage";
import { viewportsToSnapshots } from "./service/viewportsToSnapshots";
import openCommand from "./commands/open.command";

const program = new Command();

async function run() {
  program
    .name("viewsnap")
    .description("Generate snapshots of various viewport sizes for a given URL")
    .version("1.0.0");

  program.addCommand(generateCommand);
  program.addCommand(openCommand);
  program.parse();
}

run();
