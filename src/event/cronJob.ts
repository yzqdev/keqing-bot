import { segment, Client } from "oicq";

import { AbstractEvent } from "./abstractEvent";

import cron from "node-cron";
import { getTongren } from "@/service/mihoyoService";
import { randNum } from "@/util/num";
import { conf } from "@/config";

export class CronJob extends AbstractEvent {
  load(bot: Client) {
    // 接收戳一戳
    bot.on("notice.group.poke", function (e) {
      if (e.target_id === this.uin) {
        e.group.sendMsg("别戳我");
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
