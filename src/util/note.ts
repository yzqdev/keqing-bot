import { db } from "./sql";
export interface Note {
  id: number;
  tag: string;
  content: string;
}
//group为0代表私聊
export function addNote(content: string, tag: string, userId: number) {
  const stmt = db.prepare(
    "insert into note(id,tag,content,user_id) values(null,?,?,?)"
  );
  stmt.run(tag, content, userId);
}
export function selectNote(userId: number) {
  let stmt = db.prepare(`select id,tag,content from note where user_id=?`);
  return stmt.all(userId);
}
export function delNote(noticeId: number, userId: number) {
  const stmt = db.prepare("delete from note where id= ? and user_id = ?");
  stmt.run(noticeId, userId);
}
