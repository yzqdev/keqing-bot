import { db } from "@/util/sql";

export function setStatus(groupId: number, sleep: boolean) {
  db.exec(`update status set sleep=${sleep} where group_id=${groupId}`);
}

export function addStatus(groupId: number, sleep: boolean) {
  db.exec(`insert into status values(null,${groupId},${sleep})`);
}
export function selectStatus(groupId: number) {
  return db.prepare(`select group_id from status where group_id=${groupId}`).pluck().get();
}
export function selectSleep(groupId: number) {
  return db.prepare(`select sleep from status where group_id = ${groupId}`).pluck().get();
}
