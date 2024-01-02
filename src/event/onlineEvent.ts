import type { Client } from "icqq";
import { AbstractEvent } from "./abstractEvent";
import pc from "picocolors";

export class OnlineEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("system.online", function () {
      // 你的账号已上线，你可以做任何事
      console.log(bot === this);
      console.log(
        pc.cyan(
          `已上线: 我是${bot.nickname}(${bot.uin})，我有${bot.fl.size}个好友，${bot.gl.size}个群`,
        ),
      );
    });
  }
}
