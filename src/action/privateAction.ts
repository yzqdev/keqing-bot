import { PrivateMessageEvent, segment } from "oicq";

export function privateHello(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent
) {
  evt.reply(["不要骚扰我啦!", segment.face(38)]);
}
