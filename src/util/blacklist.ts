import { db } from "@/util/sql";

export function checkBlackExists(groupId: number, userId: number) {
  return db.prepare(`select group_id from blacklist where user_id = ${userId} and group_id=${groupId}`).pluck().get();
}

export function addBlack(groupId: number, userId: number) {
  db.exec(`insert into blacklist values(null,${groupId},${userId})`);
}
export function selectBlacklists(groupId: number) {
  return db.prepare(`select user_id from blacklist where group_id = ${groupId}`).pluck().all();
}
