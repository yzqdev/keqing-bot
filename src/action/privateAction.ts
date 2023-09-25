import { commonReg } from "@/constant/reg";
import { addNote, delNote, type Note, selectNote } from "@/util/note";
import { type PrivateMessageEvent, segment } from "icqq";

export function privateHello(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent,
) {
  evt.reply(["不要骚扰我啦!", segment.face(38)]);
}

/**
 * 添加记事
 * @param userId qq
 * @param msg
 * @param evt
 * @returns
 */
export function addPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent,
) {
  if (commonReg.addNote.test(msg)) {
    console.log(userId);
    let noteStr = msg.split("#", 2);
    let [content, tag] = noteStr[1]?.split(".", 2)!;
    console.log(content, tag);
    addNote(content!, tag!, userId);
    evt.reply("完成");
    return;
  }
}
/**
 * 查记事
 * @param userId
 * @param msg
 * @param evt
 * @returns
 */
export function getPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent,
) {
  if (commonReg.getNote.test(msg)) {
    let notes = selectNote(userId) as Note[];
    if (notes) {
      let head = "id,tag,content\n";
      let res = notes.map((item) => {
        return `${item.id},${item.tag},${item.content}`;
      });
      evt.reply(head + res.join("\n"));
    } else {
      evt.reply("对不起,您没有记事");
    }
    return;
  }
}
/**
 * 删除记事
 * @param userId
 * @param msg
 * @param evt
 * @returns
 */
export function delPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent,
) {
  if (commonReg.delNote.test(msg)) {
    let [_, noticeId] = msg.split("#", 2);
    delNote(+noticeId!, userId);
    evt.reply("删除成功");
    return;
  }
}
