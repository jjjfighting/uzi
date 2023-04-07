import fs from "fs";

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
