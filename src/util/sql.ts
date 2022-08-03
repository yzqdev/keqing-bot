import Database from "better-sqlite3";
export const db = new Database("keqing.db",{});
db.exec(
  "create table if not exists status (id INTEGER PRIMARY KEY AUTOINCREMENT,group_id text   UNIQUE,sleep boolean)"
);
db.exec(
  "create table if not exists group_admin (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id text  ,user_id text)"
);
