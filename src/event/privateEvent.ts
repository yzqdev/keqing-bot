import { Client } from "oicq";
import { AbstractEvent } from "./abstractEvent";
import { privateHello } from "@/action/privateAction";

export class PrivateEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.private", function (evt) {
      privateHello(evt);
    });
  }
}
