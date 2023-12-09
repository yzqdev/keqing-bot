import { segment, Client } from "icqq";

import { AbstractEvent } from "./abstractEvent";

import cron from "node-cron";
import { getCos, getTongren, getTongrenList } from "@/service/mihoyoService";
import { randNum } from "@/util/num";
import { conf } from "@/config";
import { replyMsg } from "@/constant/constants";
import { createGenshinData } from "@/action/groupAction";
import { genshinData } from "@/service/pixivService";

export class CronJob extends AbstractEvent {
  load(bot: Client) {
    cron.schedule("1 1 12 * * *", async () => {
      const img = await genshinData(1);
      let res = img[randNum(30)];

      let res1 = await genshinData(1);
      let res2 = await genshinData(2);
      let res3 = await genshinData(3);
      let rand = randNum(30);
      let randomArticle = res1[rand]!.original_url;
      let randomArticle1 = res2[rand]!.original_url;
      let randomArticle2 = res3[rand]!.original_url;
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(item, replyMsg.about12Clock);

        bot.sendGroupMsg(item, [segment.image(randomArticle), segment.image(randomArticle1), segment.image(randomArticle2)]);
      }
    });
    cron.schedule("1 1 20 * * *", async () => {
      const res: string[][] = await getCos();

      let randomArtile: string[] = res[randNum(40)]!.length > 0 ? res[randNum(40)]! : res[0]!;
      const imgUrls: string[] = randomArtile.slice(0, 3).filter(Boolean) as string[];
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(item, `${new Date().getHours()}点了,来看一些cos作品吧`);

        bot.sendGroupMsg(
          item,
          imgUrls.map((i) => segment.image(i)),
        );
      }
    });
  }
}
