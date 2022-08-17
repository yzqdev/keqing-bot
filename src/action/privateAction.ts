import { commonReg } from "@/constant/reg";
import { addNote, delNote, Note, selectNote } from "@/util/note";
import { PrivateMessageEvent, segment } from "oicq";

export function privateHello(userId:number,msg:string,evt: PrivateMessageEvent) {
  let flag=commonReg.addNote.test(msg)||commonReg.delNote.test(msg)||commonReg.getNote.test(msg)
   if (!flag ) {
     evt.reply(["不要骚扰我啦!", segment.face(38)]);
   }
 
}
export function addPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent 
) {
  if (commonReg.addNote.test(msg)) {
    console.log(userId);
    let noteStr = msg.split("#", 2);
    let [content, tag] = noteStr[1]?.split(".", 2)!;
    console.log(content, tag);
    addNote(content!, tag!, userId );
    evt.reply("完成");
    return;
  }
}
export function getPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent 
) {
  if (commonReg.getNote.test(msg)) {
    let notes = selectNote(userId ) as Note[];
    let head = "id,tag,content\n";
    let res = notes.map((item) => {
      return `${item.id},${item.tag},${item.content}`;
    });
    evt.reply(head + res.join("\n"));
    return;
  }
}
export function delPrivateNote(
  userId: number,
  msg: string,
  evt: PrivateMessageEvent, 
) {
  if (commonReg.delNote.test(msg)) {
    let [_, noticeId] = msg.split("#", 2);
    delNote(+noticeId!, userId );
    evt.reply("删除成功");
    return;
  }
}
