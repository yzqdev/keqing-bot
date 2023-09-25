import type { PrivateMessageEvent } from "icqq";

export function hello(evt: PrivateMessageEvent) {
  evt.reply("你好呀");
}
