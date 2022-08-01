import { GroupMessageEvent, segment } from "oicq";

export function createAtEvent(evt: GroupMessageEvent) {
  if (evt.raw_message) {
  }
  evt.reply(
    [
      "死鬼,别@我",
      segment.image(
        "https://img-static.mihoyo.com/communityweb/upload/a093bbd51f8b056dc237f87440b5006c.png"
      ),
    ],
    true
  );
}
