import {AbstractEvent} from "@/event/abstractEvent";
import {Client} from "oicq";
import pc from "picocolors";
import {dontTouchMe} from "@/constant/constants";
import {randNum} from "@/util/num";
import {selectSleep} from "@/util/status";

export class NoticeEvent extends AbstractEvent{
    load(bot: Client): void {
        // 接收戳一戳
        bot.on("notice.group.poke", function (evt) {
            let sleep =selectSleep(evt.group_id)
            console.log(pc.cyan(`sleep状态:${sleep}`));
            if (!sleep) {
                if (evt.target_id === this.uin) {
                    evt.group.sendMsg(`${dontTouchMe[randNum(5)]}`);
                }
                return;
            }

        });
    }
}
