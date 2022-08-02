import Database from 'better-sqlite3';
export const db = new Database('keqing.db' );
 db.exec('create table if not exists status (group_id text  PRIMARY KEY  UNIQUE,sleep boolean)')
