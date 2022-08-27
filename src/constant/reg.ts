import { conf } from "@/config";

export const mihoyoReg = {
  pixivPublic: /^%推荐(#[0-9]+)?/,
  pixivRank: /^%排行(#[0-9]+)?/,
  tongren: /^%同人$/,
  genshin: /(^%原神(#[0-9]+)?$)|%(涩图|色图|好看|好康|再来一张)/,

  cos: /^%cos$/,
  emoj: /^%emoj$/,
  char: /^%角色#[\u4e00-\u9fa5]+/,
};
export const commonReg = {
  addNote: /^记事#[0-9a-zA-Z\u4e00-\u9fa5]+\.[0-9a-zA-Z\u4e00-\u9fa5]+/,
  getNote: /^查记事/,
  delNote: /^删记事#\d+/,
  help: /^(%帮助)|(%help)$/,
  version: /^%version$/,
  /**
   * cli#help
   */
  cli: /^%cli#([0-9a-zA-Z\u4e00-\u9fa5]+)?$/,
  dict: /^%词典#([0-9a-zA-Z\u4e00-\u9fa5]+)/,
  poetry: /^%诗词|%古诗$/,
  kfc: /周四|星期四|kfc/,
  sleep: /(一边去|关闭|关机|睡觉|暂停)/,
  setBlack: /^black#[0-9]{7,11}$/,
  setAdmin: /^admin#[0-9]{7,11}$/,
  noAdmin: /^nadmin#[0-9]{7,11}$/,
  showAdminCmd: /^%admin$/,
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
