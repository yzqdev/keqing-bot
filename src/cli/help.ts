import puppeteer from "puppeteer";

import { getPup } from "@/util/file";
/**
 * 生成帮助菜单
 */
export async function genHelp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 640,
    height: 700,
  });
  let htmlPath = `file://${getPup("help", "help.html")}`;
  console.log(htmlPath);
  await page.goto(htmlPath, { waitUntil: "networkidle2" });

  await page.screenshot({ path: getPup("help", "help.png") });
  await browser.close();
}
/**
 * 生成admin帮助菜单
 */
export async function genAdmin() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 640,
    height: 250,
  });
  let htmlPath = `file://${getPup("help", "admin.html")}`;
  console.log(htmlPath);
  await page.goto(htmlPath, { waitUntil: "networkidle2" });

  await page.screenshot({ path: getPup("help", "admin.png") });
  await browser.close();
}
