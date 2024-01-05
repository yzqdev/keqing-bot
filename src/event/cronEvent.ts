import { segment, Client } from "icqq";

import { AbstractEvent } from "./abstractEvent";

import { CronJob } from "cron";
import {
  getComics,
  getCos,
  getTongren,
  getTongrenList,
} from "@/service/mihoyoService";
import { getUniqueRandomInt, randNum } from "@/util/num";
import { conf } from "@/config";
import { replyMsg } from "@/constant/constants";
import { createGenshinData } from "@/action/groupAction";
import {
  genshinData,
  getRandomPixivImgs,
  starrailTags,
} from "@/service/pixivService";
import { defaultLog } from "@/util/logger";
import { fileURLToPath } from "node:url";
import { relative } from "node:path";
const logger = defaultLog(
  relative(process.cwd(), fileURLToPath(import.meta.url)),
);
export class CronEvent extends AbstractEvent {
  load(bot: Client) {
    const noonJob = new CronJob("1 1 12 * * *", async () => {
      const { randomArticle1, randomArticle2, randomArticle3 } =
        await getRandomPixivImgs();
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(item, replyMsg.about12Clock);

        bot.sendGroupMsg(item, [
          segment.image(randomArticle1),
          segment.image(randomArticle2),
          segment.image(randomArticle3),
        ]);
      }
    });
    const afternoonJob = new CronJob("1 0 20 * * *", async () => {
      const res: string[][] = await getCos();
      logger.info("20点cos图片");
      logger.info(res);
      let randomArtile: string[] =
        res[randNum(res.length)].length > 0 ? res[randNum(res.length)] : res[0];
      console.log(randomArtile);
      const imgUrls: string[] = randomArtile
        .slice(0, 3)
        .filter(Boolean) as string[];
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(
          item,
          `${new Date().getHours()}点了,来看一些cos作品吧`,
        );

        bot.sendGroupMsg(
          item,
          imgUrls.map((i) => segment.image(i)),
        );
      }
    });
    const eighteenClockJob = new CronJob("1 0 18 * * *", async () => {
      const { randomArticle1, randomArticle2, randomArticle3 } =
        await getRandomPixivImgs(starrailTags);
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(
          item,
          `${new Date().getHours()}点了,来看一些崩铁同人作品吧`,
        );

        bot.sendGroupMsg(item, [
          segment.image(randomArticle1),
          segment.image(randomArticle2),
          segment.image(randomArticle3),
        ]);
      }
    });
    noonJob.start();
    afternoonJob.start();
    eighteenClockJob.start();
  }
}
