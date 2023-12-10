import got from "got";
import type { Tongren, TongrenResponse } from "@/interface/mihoyo";
const headers = {
  "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36`,
};
export async function getTongrenList(index: number): Promise<string[]> {
  const res: any = await got(`https://rt.huashi6.com/front/works/hotlist?_ts_=${new Date().valueOf()}&index=${index}`, {
    headers: headers,
  }).json();
  const data = res.data as TongrenResponse;
  if (data.datas && data.datas.length > 0) {
    const arr: string[] = [];
    data.datas.forEach((item) => {
      arr.push(`https://img2.huashi6.com/` + item.coverImage.originalPath);
    });
    return arr;
  } else {
    return [];
  }
}
export async function getTongren(): Promise<string[][]> {
  let { data } = (await got("https://bbs-api.mihoyo.com/post/wapi/getForumPostList?forum_id=29&gids=2&is_good=false&is_hot=false&last_id=0&page_size=40&sort_type=1", { headers }).json()) as Tongren;

  let res = data.list.map((item) => {
    return item.post.images;
  });
  return res;
}

export async function getCos(): Promise<string[][]> {
  const { data } = (await got("https://bbs-api.mihoyo.com/post/wapi/getForumPostList?forum_id=49&gids=2&is_good=false&is_hot=false&last_id=0&page_size=40&sort_type=1", {
    headers: headers,
  }).json()) as Tongren;

  const res = data.list
    .map((item) => {
      if (item.post.images.length > 0) {
        return item.post.images;
      } else {
        return false;
      }
    })
    .filter(Boolean) as string[][];
   
  return res;
}
