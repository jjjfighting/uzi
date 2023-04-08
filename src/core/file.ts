import fs from "fs";
import AdmZip from "adm-zip";

/**
 *
 * @param str
 * @returns 检查给出path是什么文件, Truth则存在，false则不存在
 */
export const exist = async (
  str: string
): Promise<"file" | "dir" | "other" | false> => {
  try {
    const stat = await fs.promises.stat(str);
    if (stat.isFile()) {
      return "file";
    } else if (stat.isDirectory()) {
      return "dir";
    } else {
      return "other";
    }
  } catch (e) {
    return false;
  }
};

/** remove file recursively */
export const remove = async (input: string): Promise<void> => {
  try {
    await fs.promises.rm(input, { recursive: true, force: true });
  } catch (e) {
    throw new Error("删除文件出错");
  }
};

export const unZip = async (
  input: string,
  output: string,
  skip = 0
): Promise<void> =>
  await new Promise((resolve) => {
    const zip = new AdmZip(input);

    skip === 0 ||
      zip.getEntries().forEach((entry) => {
        // 用于去除文件前面的skip个路径
        const items = entry.entryName.split(/\/|\\/);
        const start = Math.min(skip, items.length - 1);
        const stripped = items.slice(start).join("/");
        entry.entryName = stripped === "" ? entry.entryName : stripped;
      });

    console.log("zip: ", zip);
    zip.extractAllToAsync(output, true, true, (err) => {
      if (err) throw err;
      resolve();
    });
  });

/** 是否二进制 */
export const isBinary = (buffer) => {
  // 二进制文件的数据通常不属于 UTF-8 或 ASCII 范围内
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    if (byte < 9 || (byte > 10 && byte < 13) || byte > 126) {
      return true;
    }
  }
  return false;
};
