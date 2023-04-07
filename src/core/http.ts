import fetch, { RequestInfo, RequestInit } from "node-fetch";

export const request = async (
  url: string | RequestInfo,
  options: RequestInit
): Promise<any> => {
  const resp = await fetch(url, options);
  console.log('resp: ', resp);

  if (resp.ok) {
    return resp;
  }
  throw new Error(`网络请求出错, ${resp.statusText}`);
};


