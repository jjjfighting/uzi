import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import fs from "fs";
import { getEnvPath } from "./envPath";
import path from "path";

export const request = async (
  url: string | RequestInfo,
  options: RequestInit = {}
): Promise<Response> => {
  const resp = await fetch(url, options);

  if (resp.ok) {
    return resp;
  }
  throw new Error(`网络请求出错, ${resp.statusText}`);
};

/**
 * 
 * @desc gitlab需要验证账密，无法直接download下来
 */
export const down = async (url: string): Promise<string> =>
  new Promise(async (resolve) => {
    const resp = await request(url);

    if (resp.body === null) {
      throw new Error("Response body is empty");
    }
    await fs.promises.mkdir(getEnvPath("temp"), { recursive: true });
    // const fileName = `${getEnvPath('temp')}\\${Date.now().toString()}.tmp`;
    const fileName = path.join(
      getEnvPath("temp"),
      Date.now().toString() + ".tmp"
    );
    const fileStream = fs.createWriteStream(fileName);

    resp.body.pipe(fileStream);
    fileStream.on("finish", () => {
      resolve(fileName);
    });
  });
