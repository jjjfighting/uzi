#!/usr/bin/env node

import cac from "cac";
import main from "./index";
import { name, version } from '../package.json'


const cli = cac(name);

cli
  .command("<template>", "Create a project from template")
  .option("-f, --force", "Overwrite even if exist ")
  .allowUnknownOptions()
  .action((template, options) => {
    console.log("template: ", template);
    console.log("options: ", options);
    // ...
  });
//   .action(main)

cli.help().version(version).parse()

