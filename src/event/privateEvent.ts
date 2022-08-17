import { Client } from "oicq";
import { AbstractEvent } from "./abstractEvent";
import {
  addPrivateNote,
  delPrivateNote,
  getPrivateNote,
  privateHello,
} from "@/action/privateAction";
import { commonReg } from "@/constant/reg";
import { addNote, Note, selectNote } from "@/util/note";

export class PrivateEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.private", function (evt) {
      let msg = evt.raw_message;
      let userId = evt.sender.user_id;

      privateHello(evt);
    });
  }
}
