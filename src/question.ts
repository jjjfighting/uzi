import type { Context } from "./types";
import path from "path";
import fs from "fs";
import { exist, remove } from "./core/file";
import prompts from "prompts";

export default async (ctx: Context): Promise<void> => {
  console.log(111);
  ctx.dest = path.resolve(ctx.projectName);
  console.log("ctx.dest: ", ctx.dest);

  const isExist = await exist(ctx.dest);

  if (!isExist) return;

  // 强制
  if (isExist && !!ctx.options?.force) {
    return await remove(ctx.dest);
  }

  // 未指定强制
  const answers = await prompts([
    {
      name: "choose",
      type: "select",
      message:
        "Target directory is not empty. You should choose how to continue",
      choices: [
        { title: "Overwrite", value: "overwrite" },
        { title: "Cancel", value: "cancel" },
      ],
    },
  ]);
  if (!answers.choose || answers.choose === "cancel") {
    throw new Error("You cancel this task");
  }
  if (answers.choose === "overwrite") {
    return await remove(ctx.dest);
  }
};
