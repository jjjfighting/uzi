import { Context } from "./types";
import fs from "fs";
import path from "path";
import ora from "ora";

export default async (ctx: Context): Promise<void> => {
  const spinner = ora("Start release files...").start();
  await Promise.all(
    ctx.files.map(async (item) => {
      await fs.promises.mkdir(path.dirname(path.join(ctx.dest, item.path)), {
        recursive: true,
      });
      await fs.promises.writeFile(path.join(ctx.dest, item.path), item.content);
    })
  );
  spinner.stop();
  console.log(
    `Created a new project in \`${ctx.projectName}\` by the \`${ctx.template}\` template.\n`
  );
};
