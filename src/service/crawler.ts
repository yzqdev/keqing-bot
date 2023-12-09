import puppeteer from "puppeteer";
export interface Avatar {
  name: string;
  src: string;
}
/**
 * 仅做示例
 * @returns
 */
export async function getCharacterAvatar(): Promise<Avatar[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://bbs.mihoyo.com/ys/obc/channel/map/189/25?bbs_presentation_style=no_header", {
    waitUntil: "networkidle2",
  });

  let divs = (await page.$$eval(".collection-avatar__item", (e) => {
    return e.map((item: Element) => {
      return {
        name: item.querySelector(".collection-avatar__title")?.innerHTML,
        src: item.querySelector(".collection-avatar__icon")!.getAttribute("data-src"),
      };
    });
  })) as Avatar[];
  await browser.close();
  return divs;
}
