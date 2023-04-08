import { Context } from "./types";
import { isBinary } from "./core/file";
import { template, templateSettings } from "lodash";

export default async (ctx: Context): Promise<void> => {
  templateSettings.interpolate = /\<%=([\s\S]+?)%\>/g;

  ctx.files.forEach((item) => {
    // 二进制文件不处理
    if (isBinary(item.content)) return;

    const text = item.content.toString();
    const compiled = template(text);
    item.content = Buffer.from(compiled(ctx.answers));
  });
};
