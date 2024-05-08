import got from "got";
import type { PixivItem, PixivRes, RealPixiv } from "@/interface/pixiv";
import { commonVar } from "@/constant/constants";
import { randNum } from "@/util/num";
import { defaultLog } from "@/util/logger";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
const logger = defaultLog(
  relative(process.cwd(), fileURLToPath(import.meta.url)),
);
export async function publicData(
  offsetIndex: number = 1,
): Promise<PixivItem[]> {
  console.log("获取数据");

  const pixList: PixivItem[] = [];
  //这里offset相当于pageNumber*limit

  //原创插图
  const publicUrl = `http://www.vilipix.com/api/v1/picture/public?limit=18&offset=${
    offsetIndex * 18
  }&sort=hot&type=0`;
  const { data } = (await got
    .get(publicUrl, {
      https: {
        certificateAuthority: [],
        rejectUnauthorized: false,
      },
    })
    .json()) as PixivRes;

  //
  pixList.push(...data.rows);
  return pixList;
}
export async function rankData(offsetIndex: number = 1): Promise<PixivItem[]> {
  console.log("获取数据");

  const pixList: PixivItem[] = [];
  //这里offset相当于pageNumber*limit

  const dailyUrl = `http://www.vilipix.com/api/v1/picture/ranking?limit=16&offset=${
    offsetIndex * 16
  }&type=0&mode=daily`;
  //原创插图

  const { data } = (await got
    .get(dailyUrl, {
      https: {
        certificateAuthority: [],
        rejectUnauthorized: false,
      },
    })
    .json()) as PixivRes;

  //
  pixList.push(...data.rows);
  return pixList;
}
export const starrailTags = "崩坏星穹铁道";
export const genshinTags="Genshin+Impact,GenshinImpact,Genshin"
export async function genshinData(
  pageNum: number = 1,
  tag = genshinTags,
) {
  const pixList: PixivItem[] = [];
  // const genshinUrl = `http://www.vilipix.com/api/v1/picture/public?limit=30&tags=${tag}&sort=new&offset=${
  //   30 * pageNum
  // }`;
  const genshinUrl = `https://api2.vilipix.com/api/v1/picture/public?limit=30&tags=${tag}&sort=new&offset=${
    30 * pageNum
  }`;
  logger.info(`tag=> ${tag}, pageNum=> ${pageNum}`)
  logger.info(genshinUrl);
  const { data } = (await got
    .get(genshinUrl, {
      https: {
        certificateAuthority: [],
        rejectUnauthorized: false,
      },
    })
    .json()) as PixivRes;

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
  const img = (await got(
    `https://api.lolicon.app/setu/v2?tag=${commonVar.tag}`,
  ).json()) as RealPixiv;
  const singleImg = img.data[0]!.urls.original;
  return singleImg;
}
export async function getRandomPixivImgs(tags =genshinTags) {
  const res1 = await genshinData(1, tags);
  const res2 = await genshinData(2, tags);
  const res3 = await genshinData(3, tags);
  const randomArticle1 = res1[randNum(res1.length)]!.original_url;
  const randomArticle2 = res2[randNum(res2.length)]!.original_url;
  const randomArticle3 = res3[randNum(res3.length)]!.original_url;
  logger.info("getRandomPixivImgs");
  logger.info(res1.length);
  logger.info(res2.length);
  logger.info(res3.length);
  return { randomArticle1, randomArticle2, randomArticle3 };
}
