import { createBing, createGenshinData } from "@/action/groupAction";

export const replyMsg = {
  searchImg: "搜索图片中...",
  errMsg: (err: Error) => {
    return `不好意思,出错了=>${err}`;
  },

  //cli
  cmdComplete: "命令执行成功",
};
export const commonVar = {
  tag: "GenshinImpact|(Genshin Impact)",
};
export const atMap = new Map([
  ["原神", createGenshinData],
  ["rank", createBing],
]);

export const dontTouchMe: string[] = [
  "别戳我",
  "再戳我一下试试",
  "有完没完了?",
  "别戳了,崽种!",
  "再戳我就把你吃掉",
];
