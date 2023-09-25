import { Client } from "icqq";
import { AbstractEvent } from "./abstractEvent";

export class RequestEvent extends AbstractEvent {
  public load(bot: Client): void {
    // 同意好友申请
    bot.on("request.friend", (e) => e.approve(false));

    // 同意群邀请
    bot.on("request.group.invite", (e) => e.approve(false));

    // 同意加群申请，拒绝`e.approve(false)`
    bot.on("request.group.add", (e) => e.approve(false));
  }
}
