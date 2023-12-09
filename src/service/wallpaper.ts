import got from "got";
import type { BingRes, HavenItem, HavenRes } from "@/interface/wallpaper";

export async function bingApi(pageNum: number) {
  let res = (await got("https://api.codelife.cc/bing/list?page=" + pageNum, {
    headers: {
      signaturekey: "U2FsdGVkX1+ICfYD6Qvr+SENz60GSHrAkzvXjzcnhf8=",

      version: "1.2.35",
    },
  }).json()) as BingRes;
  let imgs = res.data.map((item) => {
    return item.fullSrc;
  });
  return imgs;
}
export let paramMap = new Map([
  ["赛博朋克", "376"],
  ["风景", "711"],
  ["动漫女孩", "1"],
  ["数字图像", "13"],
]);

export async function wallhavenApi(type: string) {
  let res1 = (await got(`https://api.codelife.cc/wallpaper/wallhaven?lang=cn&page=1&sorting=random&topRange=6M&q=id:${paramMap.get(type)}`, {
    headers: {
      signaturekey: "U2FsdGVkX19VF+bmyW2i2DGLVILeDIS2rAvXIU+2Iww=",
      version: "1.2.35",
    },
  }).json()) as HavenRes;
  let res2 = (await got(`https://api.codelife.cc/wallpaper/wallhaven?lang=cn&page=2&sorting=random&topRange=6M&q=id:${paramMap.get(type)}`, {
    headers: {
      signaturekey: "U2FsdGVkX19VF+bmyW2i2DGLVILeDIS2rAvXIU+2Iww=",
      version: "1.2.35",
    },
  }).json()) as HavenRes;
  let data = [...res1.data, ...res2.data].map((item: HavenItem) => {
    return item.raw;
  });
  return data;
}
