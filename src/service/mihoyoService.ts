import got from "got";
import type { Tongren } from "@/interface/mihoyo";

export async function getTongren(): Promise<string[][]> {
  let { data } = (await got(
    "https://bbs-api.mihoyo.com/post/wapi/getForumPostList?forum_id=29&gids=2&is_good=false&is_hot=false&last_id=0&page_size=40&sort_type=1",
  ).json()) as Tongren;

  let res = data.list.map((item) => {
    return item.post.images;
  });
  return res;
}
export async function getCos(): Promise<string[][]> {
  let { data } = (await got(
    "https://bbs-api.mihoyo.com/post/wapi/getForumPostList?forum_id=49&gids=2&is_good=false&is_hot=false&last_id=${lastId}&page_size=40&sort_type=1",
  ).json()) as Tongren;

  let res = data.list.map((item) => {
    return item.post.images;
  });
  return res;
}
