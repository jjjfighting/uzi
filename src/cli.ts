#!/usr/bin/env node

import cac from "cac";
import main from "./index";
import { name, version } from "../package.json";

const cli = cac(name);

cli
  .command("<template> <projectName>", "Create a project from template")
  .option("-f, --force", "Overwrite even if exist ")
  .allowUnknownOptions()
  .action(main);

cli.command("list", "Show templates").action(() => {});

cli.help().version(version).parse();

process.on("uncaughtException", (err: Error) => {
  console.log(`msg: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`msg: ${err.message}`);
  process.exit(1);
});
