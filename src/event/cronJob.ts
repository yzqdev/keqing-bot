import { segment, Client } from "oicq";

import { AbstractEvent } from "./abstractEvent";

import cron from "node-cron";
import { getTongren } from "@/service/mihoyoService";
import { randNum } from "@/util/num";
import { conf } from "@/config";
import { dontTouchMe } from "@/constant/constants";
import {db} from "@/util/sql";
import pc from "picocolors";

export class CronJob extends AbstractEvent {
  load(bot: Client) {
    // 接收戳一戳
    bot.on("notice.group.poke", function (evt) {
      let sleep = db
          .prepare(`select sleep from status where group_id = ${evt.group_id}`)
          .pluck()
          .get();
      console.log(pc.cyan(`sleep状态:${sleep}`));
      if (!sleep) {
        if (evt.target_id === this.uin) {
          evt.group.sendMsg(`${dontTouchMe[randNum(5)]}`);
        }
        return;
      }

    });

    cron.schedule("1 0 12 * * *", async () => {
      let res: string[][] = await getTongren();
      let rand = randNum(40);
      let randomArtile: string[] = res[rand]!;
      let randomArtile1: string[] = res[rand + 1]!;
      let randomArtile2: string[] = res[rand + 2]!;
      for (let item of conf.preferGroup) {
        bot.sendGroupMsg(item, "12点了,来看一些同人作品吧");

        bot.sendGroupMsg(item, [
          ...randomArtile?.map((item) => {
            return segment.image(item);
          }),
          ...randomArtile1?.map((item) => {
            return segment.image(item);
          }),
          ...randomArtile2?.map((item) => {
            return segment.image(item);
          }),
        ]);
      }
    });
  }
}
