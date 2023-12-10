import Database from "better-sqlite3";
import pc from "picocolors";
import { defaultLog } from "./logger";
import { fileURLToPath } from "url";
const logger=defaultLog( fileURLToPath(import.meta.url))
function loggerFun(args: string | number | null | undefined) {
  logger.info(`sql=> `  + args);
}
export const db = new Database("keqing.db", { verbose: loggerFun });
db.exec("create table if not exists status (id INTEGER PRIMARY KEY AUTOINCREMENT,group_id INTEGER   UNIQUE,sleep boolean)");
db.exec("create table if not exists group_admin (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER  ,user_id INTEGER)");
db.exec("create table if not exists blacklist (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER  ,user_id INTEGER)");
db.exec("create table if not exists note (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT  ,content TEXT,user_id INTEGER )");
