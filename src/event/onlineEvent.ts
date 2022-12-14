import { Client } from "oicq";
import { AbstractEvent } from "./abstractEvent";
import pc from "picocolors";

export class OnlineEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("system.online", function () {
      // 你的账号已上线，你可以做任何事
      console.log(
        pc.cyan(
          `已上线: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`
        )
      );
    });
  }
}
