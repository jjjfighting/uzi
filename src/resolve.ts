import { Context } from "./types";
import { initialData } from "./core/config";
import crypto from "crypto";
import path from "path";
import { getEnvPath } from "./core/envPath";
import { exist, remove } from "./core/file";
import ora from "ora";

export const getTemplatePath = (input: string): string => {
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
  console.log("obj: ", obj);

  return initialData.registry.replace(/{(\w+)}/g, (str1, str2) => {
    return obj[str2];
  });
};

/**
 * resolve url is innerTemplate url / remote url / local template
 * @desc 目前只支持gitlab tsintergy内置模板
 * @todo remote url && local template
 */
export default async (ctx: Context): Promise<void> => {
  console.log(222);
  // fetch url
  const url = await getTemplatePath(ctx.template);
  console.log("url: ", url);

  const urlHash = crypto
    .createHash("sha256")
    .update(url)
    .digest("hex")
    .substring(0, 8);

  // template cache src
  ctx.src = path.join(getEnvPath("cache"), urlHash);
  console.log("ctx.src: ", ctx.src);

  const isExist = !!exist(ctx.src);
  if (isExist) {
    remove(ctx.src);
  }

  const spinner = ora("Download template ...").start();

  setTimeout(() => spinner.stop(), 1000);

  try {
  } catch (e) {}
};
