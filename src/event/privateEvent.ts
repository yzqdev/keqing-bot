import { Client, segment } from "oicq";
import { AbstractEvent } from "./abstractEvent";

export class PrivateEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.private", function (e) {
      e.reply(["不要骚扰我啦!", segment.face(38)]);
    });
  }
}
