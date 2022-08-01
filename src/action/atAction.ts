import { GroupMessageEvent, segment } from "oicq";
import {   atMap } from "@/constant/constants";
import { mihoyoReg } from "@/constant/reg";
import { createGenshinData } from "@/action/groupAction";
function atUseMap(evt: GroupMessageEvent) {
  console.log("rawmessage", evt.raw_message);
  // let msg=evt.raw_message
  let msg = evt.raw_message.replace(/@\S*\s*/, "");
  let method = atMap.get(msg);
  console.log(!!method);
  if (!!method) {
    method(evt);
  } else {
    createAtNotMatch(evt);
  }
}

/**
 * 正则不匹配时输出
 * @param evt
 */
export function createAtNotMatch(evt: GroupMessageEvent) {
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
  } else {
    createAtNotMatch(evt);
  }
}
