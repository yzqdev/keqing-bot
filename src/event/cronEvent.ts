import { segment, Client } from "icqq";

import { AbstractEvent } from "./abstractEvent";

import { CronJob } from "cron";
import { getCos, getTongren, getTongrenList } from "@/service/mihoyoService";
import { randNum } from "@/util/num";
import { conf } from "@/config";
import { replyMsg } from "@/constant/constants";
import { createGenshinData } from "@/action/groupAction";
import { genshinData } from "@/service/pixivService";

export class CronEvent extends AbstractEvent {
  load(bot: Client) {
    const noonJob = new CronJob("1 1 12 * * *",async () => {
 const img = await genshinData(1);
 let res = img[randNum(img.length)];

 let res1 = await genshinData(1);
 let res2 = await genshinData(2);
 let res3 = await genshinData(3);
 let randomArticle1 = res1[randNum(res1.length)]!.original_url;
 let randomArticle2 = res2[randNum(res2.length)]!.original_url;
 let randomArticle3 = res3[randNum(res3.length)]!.original_url;
 for (let item of conf.preferGroup) {
   bot.sendGroupMsg(item, replyMsg.about12Clock);

   bot.sendGroupMsg(item, [
     segment.image(randomArticle1),
     segment.image(randomArticle2),
     segment.image(randomArticle3),
   ]);
 }
    });
   const afternoonJob = new CronJob("1 0 20 * * *",async  () => {
    const res: string[][] = await getCos();

    let randomArtile: string[] =
      res[randNum(res.length)].length > 0
        ? res[randNum(res.length)]
        : res[0];
      console.log(randomArtile)
    const imgUrls: string[] = randomArtile
      .slice(0, 3)
      .filter(Boolean) as string[];
    for (let item of conf.preferGroup) {
      bot.sendGroupMsg(item, `${new Date().getHours()}点了,来看一些cos作品吧`);

      bot.sendGroupMsg(
        item,
        imgUrls.map((i) => segment.image(i)),
      );
    }
   });
    noonJob.start();
    afternoonJob.start();
  }
}
