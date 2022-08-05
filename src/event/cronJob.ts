import { segment, Client } from "oicq";

import { AbstractEvent } from "./abstractEvent";

import cron from "node-cron";
import { getTongren } from "@/service/mihoyoService";
import { randNum } from "@/util/num";
import { conf } from "@/config";

export class CronJob extends AbstractEvent {
  load(bot: Client) {
    cron.schedule("1 0 12 * * *", async () => {
      let res: string[][] = await getTongren();
      let rand = randNum(40);
      let randomArticle: string[] = res[rand]!;
      let randomArticle1: string[] = res[rand + 1]!;
      let randomArticle2: string[] = res[rand + 2]!;
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(item, "12点了,来看一些同人作品吧");

        bot.sendGroupMsg(item, [
          ...randomArticle?.map((item) => {
            return segment.image(item);
          }),
          ...randomArticle1?.map((item) => {
            return segment.image(item);
          }),
          ...randomArticle2?.map((item) => {
            return segment.image(item);
          }),
        ]);
      }
    });
  }
}
