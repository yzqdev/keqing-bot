import { AbstractEvent } from "@/event/abstractEvent";
import { Client, GroupPokeEvent, segment } from "oicq";
import pc from "picocolors";
import { dontTouchMe } from "@/constant/constants";
import { randNum } from "@/util/num";
import { selectSleep } from "@/util/status";
import { selectBlacklists } from "@/util/blacklist";

export class NoticeEvent extends AbstractEvent {
  load(bot: Client): void {
    // 接收戳一戳
    bot.on("notice.group.poke", function (evt: GroupPokeEvent) {
      let groupId = evt.group_id;
      let userId = evt.target_id;
      if (selectBlacklists(groupId).includes(userId)) {
        evt.group.sendMsg(["您已被拉黑", segment.at(userId)]);
        return;
      }
      let sleep = selectSleep(evt.group_id);
      console.log(pc.cyan(`sleep状态:${sleep}`));
      if (!sleep) {
        if (evt.target_id === this.uin) {
          evt.group.sendMsg(`${dontTouchMe[randNum(dontTouchMe.length)]}`);
        }
        return;
      }
    });
  }
}
