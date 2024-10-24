#!/bin/env node

import { Command } from "commander";
import generateCommand from "./commands/generate.command";

const program = new Command();

async function run() {
  program
    .name("viewsnap")
    .description("Generate snapshots of various viewport sizes for a given URL")
    .version("1.0.0");

  program.addCommand(generateCommand);
  program.parse();
}

run();
