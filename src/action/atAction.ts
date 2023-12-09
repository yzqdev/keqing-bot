import { type GroupMessageEvent, segment } from "icqq";
import { commonReg, mihoyoReg } from "@/constant/reg";
import { createGenshinData, createJoke } from "@/action/groupAction";

/**
 * 正则不匹配时输出
 * @param evt
 */
export function createAtNotMatch(evt: GroupMessageEvent) {
  // evt.reply(
  //   [
  //     "死鬼,别@我",
  //     segment.image(
  //       "https://img-static.mihoyo.com/communityweb/upload/a093bbd51f8b056dc237f87440b5006c.png",
  //     ),
  //   ],
  //   true,
  // );
}

/**
 * at我事件
 * @param evt
 */
export function createAtEvent(evt: GroupMessageEvent) {
  //用Map不行啊,看来得用if了
  // atUseMap(evt)
  let rawMessage = evt.raw_message;
  let msg = rawMessage.replace(/@\S*\s*/, "");
  if (mihoyoReg.genshin.test(msg)) {
    createGenshinData(evt);
    return;
  }
  if (mihoyoReg.joke.test(rawMessage)) {
    createJoke(evt)
    return
  }
  createAtNotMatch(evt);
}
