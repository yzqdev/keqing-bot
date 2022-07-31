//tags http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome
//new http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=【0开始】&count=【加载数】&from=360chrome
//专区 http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=【分类ID】&start=【0开始】&count=【加载数】&from=360chrome

import got from "got";
import { BaseRes, TypeItem } from "@/interface/wallpaper";

export async function get360Types() {
  let types = (await got(
    "http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome"
  ).json()) as { data: TypeItem[] };

  return types;
}
export async function get360TypeMap() {
  let types = await get360Types();
  let typeMap = new Map();
  for (const item of types.data) {
    typeMap.set(item.name, item.id);
  }
  return typeMap;
}
export async function get360Type(type: string = "风景大片"): Promise<any[]> {
  let typeMap = await get360TypeMap();
  let res = (await got(
    `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${typeMap.get(
      type
    )}&start=0&count=50&from=360chrome`
  ).json()) as BaseRes;
  return res.data;
}
export async function boot() {
  let res = await got(
    `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=0&count=50&from=360chrome`
  ).json();
  console.log(res);
}
