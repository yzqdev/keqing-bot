import { conf } from "@/config";

export const mihoyoReg = {
  pixivPublic: /^%推荐(#[0-9]+)?/,
  pixivRank: /^%排行(#[0-9]+)?/,
  tongren: /^%同人$/,
  genshin: /(^%原神(#[0-9]+)?$)|(涩图|色图|好看|好康|再来一张)/,

  cos: /^%cos$/,
  emoj: /^%emoj$/,
  char: /^%角色#[\u4e00-\u9fa5]+/,
};
export const commonReg = {
  help: /^(%帮助)|(%help)$/,
  cli: /^%cli#([0-9a-zA-Z\u4e00-\u9fa5]+)?$/,
  poetry: /^%诗词|%古诗$/,
  kfc: /周四|星期四|kfc/,
  sleep: /(一边去|关闭|关机|睡觉)/,
  getup: /(起来|起床|开机|工作)/,
  admin: new RegExp(conf.adminList.join("|")),
};
export const wallpaperReg = {
  bing: /^%必应壁纸(#[0-9]+)?/,
  unsplash: /^%unsplash(#[0-9]+)?/,
  wallhaven: /^%wallhaven(#[0-9]+)?/,
  three: /^%360壁纸$/,
};
export const atReg = {
  genshin: /(^原神(#[0-9]+)?$)|(涩图|色图|好看|好康|再来一张)/,
};
