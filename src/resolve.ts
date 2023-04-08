import { Context } from "./types";
import { initialData } from "./core/config";
import crypto from "crypto";
import path from "path";
import { getEnvPath } from "./core/envPath";
import { exist, remove } from "./core/file";
import ora from "ora";
import { down } from "./core/http";
import { unZip } from "./core/file";
import fs from "fs";
import { spawn } from "child_process";

export const getTemplatePath = (input: string, registry: string): string => {
  if (/^https?:/.test(input)) {
    return input;
  }

  // 特殊处理 fire， group
  if (input === "fire") {
    input = "frontend/adss-template-fire";
  }
  if (input === "group") {
    input = "frontend/adss-template-group";
  }

  // 一般是 [(分组group名/包名)|包名]#分支名
  const [fullName, maybeBranch] = input.split("#");
  const fullNameArr = fullName.split("/");

  const obj = {
    owner:
      fullNameArr.length === 1
        ? initialData.official
        : fullNameArr.slice(0, fullNameArr.length - 1).join("/"),
    name:
      fullNameArr.length === 1
        ? fullNameArr.toString()
        : fullNameArr[fullNameArr.length - 1],
    branch: maybeBranch ?? initialData.branch,
  };
  initialData.temp = obj;

  return registry.replace(/{(\w+)}/g, (str1, str2) => {
    return obj[str2];
  });
};

/**
 * resolve url is innerTemplate url / remote url / local template
 * @desc 目前只支持gitlab tsintergy内置模板
 * @todo remote url && local template
 */
export default async (ctx: Context): Promise<void> => {
  // fetch url
  const url = await getTemplatePath(ctx.template, initialData.registry);
  //  http://git.tsintergy.com:8070/frontend/adss-template-fire/-/archive/master/adss-template-fire-master.zip

  const gitlabUrl = await getTemplatePath(
    ctx.template,
    initialData.gitlab_registry
  );

  const urlHash = crypto
    .createHash("sha256")
    .update(gitlabUrl)
    .digest("hex")
    .substring(0, 8);

  // template cache src
  ctx.src = path.join(getEnvPath("cache"), urlHash);

  const isExistDir = (await exist(ctx.src)) === "dir";
  if (isExistDir) {
    await remove(ctx.src);
  }
  await fs.promises.mkdir(ctx.src, { recursive: true });

  const spinner = ora("Download template ...").start();

  try {
    // if (github) {
    //   const temp  = await down(url);
    //   console.log('temp: ', temp);
    //   // 解压
    //   await unZip(temp, ctx.src,1);
    // }

    // gitlab 直接在cache路径下 git clone // 无法指定branch
    // http://git.tsintergy.com:8070/frontend/adss-template-fire.git
    const gitClone = spawn("git", ["clone", gitlabUrl], { cwd: ctx.src });
    await new Promise((resolve, rejects) => {
      gitClone.on("close", (code) => {
        if (code == 0) {
          resolve("ok");
        } else {
          rejects("failed");
        }
      });
    });

    spinner.succeed("Download template complete.");
  } catch (e) {
    spinner.stop();
    throw new Error(`Failed to pull ${ctx.template}, from ${gitlabUrl}`);
  }
};
