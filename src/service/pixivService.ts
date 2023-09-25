import got from "got";
import type { PixivItem, PixivRes, RealPixiv } from "@/interface/pixiv";
import { commonVar } from "@/constant/constants";
export async function publicData(
  offsetIndex: number = 1,
): Promise<PixivItem[]> {
  console.log("获取数据");

  let pixList: PixivItem[] = [];
  //这里offset相当于pageNumber*limit

  //原创插图
  let publicUrl = `https://www.vilipix.com/api/v1/picture/public?limit=18&offset=${
    offsetIndex * 18
  }&sort=hot&type=0`;
  let { data } = (await got.get(publicUrl).json()) as PixivRes;

  //
  pixList.push(...data.rows);
  return pixList;
}
export async function rankData(offsetIndex: number = 1): Promise<PixivItem[]> {
  console.log("获取数据");

  let pixList: PixivItem[] = [];
  //这里offset相当于pageNumber*limit

  let dailyUrl = `https://www.vilipix.com/api/v1/picture/ranking?limit=16&offset=${
    offsetIndex * 16
  }&type=0&mode=daily`;
  //原创插图

  let { data } = (await got.get(dailyUrl).json()) as PixivRes;

  //
  pixList.push(...data.rows);
  return pixList;
}
export async function genshinData(pageNum: number = 1) {
  let pixList: PixivItem[] = [];
  let genshinUrl = `https://www.vilipix.com/api/v1/picture/public?limit=30&tags=genshin+impact&sort=new&offset=${
    30 * pageNum
  }`;

  let { data } = (await got.get(genshinUrl).json()) as PixivRes;

  //
  pixList.push(...data.rows);
  return pixList;
}

/**
 * <p>setu api</p>
 * <a href='https://api.lolicon.app/#/setu'>地址</a>
 */
export async function realPixiv() {
  //r18默认为false
  let img = (await got(
    `https://api.lolicon.app/setu/v2?tag=${commonVar.tag}`,
  ).json()) as RealPixiv;
  let singleImg = img.data[0]!.urls.original;
  return singleImg;
}
