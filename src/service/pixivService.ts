import got from "got";
import { PixivItem, PixivRes } from "@/interface/pixiv";
export async function publicData(
  offsetIndex: number = 1
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
