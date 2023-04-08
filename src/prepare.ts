import path from "path";
import { Context } from "./types";
import glob from "fast-glob";
import fs from "fs";

export default async (ctx: Context): Promise<void> => {
  const cwd = path.join(ctx.src, "template");
  const entries = await glob("**/*", { cwd, dot: true });

  await Promise.all(
    entries.map(async (item) => {
      const content = await fs.promises.readFile(path.join(cwd, item));
      ctx.files.push({ path: item, content });
    })
  );
};
