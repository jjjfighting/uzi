import { Context } from "./types";
import ora from "ora";
import { spawn } from "child_process";
import path from "path";
import { initialData } from "./core/config";

export default async (ctx: Context): Promise<void> => {
  // clone 方式拉取，导致cache路径更新
  ctx.src = path.join(ctx.src, initialData.temp.name);

  // config里面都是模板的配置，设置name
  ctx.config.name = ctx.template;

  const spinner = ora("Install template dependencies").start();
  const cmd = process.platform === "win32" ? "npm.cmd" : "npm";
  try {
    await new Promise((resolve, rejects) =>
      spawn(cmd, ["install"], { cwd: ctx.src })
        .on("error", rejects)
        .on("exit", (code) => {
          if (code == 0) return resolve(code);
          rejects(new Error("Failed execute install "));
        })
    );
    spinner.succeed("Install dependencies finish");
  } catch (e) {
    spinner.fail("Install dependencies failed");
  }

  try {
    const mod = require(ctx.src);
    Object.assign(ctx.config, mod);
  } catch (e) {
    throw new Error("Incorrect template format ");
  }
};
