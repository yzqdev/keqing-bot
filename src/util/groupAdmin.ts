import { db } from "@/util/sql";
export function selectAllAdmins(groupId: number) {
  return db
    .prepare(`select user_id from group_admin where group_id=${groupId}`)
    .pluck()
    .all();
}
export function checkAdminExists(groupId: number, userId: number) {
  return db
    .prepare(
      `select group_id from group_admin where user_id = ${userId} and group_id=${groupId}`
    )
    .pluck()
    .get();
}
export function addAdmin(groupId: number, userId: number) {
  db.exec(`insert into group_admin values(null,${groupId},${userId})`);
}
export function removeAdmin(groupId: number, userId: number) {
  db.exec(
    `delete from group_admin where user_id=${userId} and group_id=${groupId}`
  );
}
