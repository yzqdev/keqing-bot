import { Client } from "icqq";
import { AbstractEvent } from "./abstractEvent";
import {
  addPrivateNote,
  delPrivateNote,
  getPrivateNote,
  privateHello,
} from "@/action/privateAction";

export class PrivateEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.private", function (evt) {
      let msg = evt.raw_message;
      let userId = evt.sender.user_id;

      privateHello(userId, msg, evt);
      addPrivateNote(userId, msg, evt);
      delPrivateNote(userId, msg, evt);
      getPrivateNote(userId, msg, evt);
    });
  }
}
