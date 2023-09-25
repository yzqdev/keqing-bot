import Database from "better-sqlite3";
import pc from "picocolors";
function logger(args: string | number | null | undefined) {
  console.log(`sql=> ` + pc.cyan(args));
}
export const db = new Database("keqing.db", { verbose: logger });
db.exec(
  "create table if not exists status (id INTEGER PRIMARY KEY AUTOINCREMENT,group_id INTEGER   UNIQUE,sleep boolean)",
);
db.exec(
  "create table if not exists group_admin (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER  ,user_id INTEGER)",
);
db.exec(
  "create table if not exists blacklist (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER  ,user_id INTEGER)",
);
db.exec(
  "create table if not exists note (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT  ,content TEXT,user_id INTEGER )",
);
