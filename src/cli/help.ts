import puppeteer from "puppeteer";

import { getPup } from "@/util/file";

export async function genHelp() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 640,
    height: 720,
  });
  let htmlPath = `file://${getPup("help", "help.html")}`;
  console.log(htmlPath);
  await page.goto(htmlPath, { waitUntil: "networkidle2" });

  await page.screenshot({ path: getPup("help", "help.png") });
  await browser.close();
}
