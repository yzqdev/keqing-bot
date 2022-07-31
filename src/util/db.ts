import { existsSync, writeFileSync } from "fs";
import { JSONFile, Low } from "lowdb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../files/db.json");
let defaultJson = {
  sleep: false,
};
if (!existsSync(file)) {
  writeFileSync(file, JSON.stringify(defaultJson));
}
const adapter = new JSONFile(file);
const db = new Low(adapter);

export interface Db {
  sleep: boolean;
}

export async function sleep() {
  await db.read();
  let data = db.data as Db;
  data.sleep = true;
  await db.write();
}

export async function getUp() {
  await db.read();
  let data = db.data as Db;
  data.sleep = false;
  await db.write();
}

export async function getSleepStatus() {
  await db.read();
  let data = db.data as Db;
  return data.sleep;
}
