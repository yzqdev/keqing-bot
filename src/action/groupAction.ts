import { emojs } from "@/constant/mihoyo";
import { commonReg, mihoyoReg, wallpaperReg } from "@/constant/reg";
import { getCos, getTongren } from "@/service/mihoyoService";
import {
  genshinData,
  publicData,
  rankData,
  realPixiv,
} from "@/service/pixivService";
import { bingApi, paramMap, wallhavenApi } from "@/service/wallpaper";
import { get360Type, get360TypeMap } from "@/service/360service";
import { getUp, sleep } from "@/util/db";
import { getPup, readVendorFile } from "@/util/file";
import { randNum } from "@/util/num";
import { GroupMessageEvent, segment } from "oicq";
import { getCharacterAvatar } from "@/service/crawler";
import { createAtEvent } from "@/action/atAction";
import { Poetry } from "@/interface/global";
import got from "got";
import { readFileSync } from "fs";
import { genHelp } from "@/cli/help";
import { replyMsg } from "@/constant/constants";

/**
 * trycatch要占一个大括号的位置,算了还是用.catch吧
 * @param evt
 */
export function createGenshinData(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.genshin.test(msg)) {
    //evt.reply(replyMsg.searchImg);
    let msgArr = msg.split("#", 2);
    try {
      if (msgArr[1]) {
        genshinData(+msgArr[1]).then((img) => {
          evt.reply(segment.image(img[randNum(30)]!.original_url));
        });
      } else {
        genshinData(randNum(10)).then((img) => {
          evt.reply(segment.image(img[randNum(30)]!.original_url));
        });
      }
    } catch (err) {
      evt.reply(replyMsg.errMsg(err as Error));
    }
  }
}

/**
 * pixiv推荐
 * @param evt
 */
export function createPixivPublic(evt: GroupMessageEvent) {
  let message = evt.raw_message;
  if (mihoyoReg.pixivPublic.test(message)) {
    //evt.reply(replyMsg.searchImg);
    let msgArr = message.split("#", 2);
    if (msgArr[1]) {
      publicData(+msgArr[1])
        .then((img) => {
          evt.reply(segment.image(img[randNum(16)]!.original_url));
        })
        .catch((err) => {
          evt.reply(replyMsg.errMsg(err));
        });
    }
  }
}

/**
 * pixiv排行
 * @param evt
 */
export function createPixivRanking(evt: GroupMessageEvent) {
  let message = evt.raw_message;
  if (mihoyoReg.pixivRank.test(message)) {
    //evt.reply(replyMsg.searchImg);
    let msgArr = message.split("#", 2);
    if (msgArr[1]) {
      rankData(+msgArr[1])
        .then((img) => {
          evt.reply(segment.image(img[randNum(16)]!.original_url));
        })
        .catch((err) => {
          evt.reply(replyMsg.errMsg(err));
        });
    }
  }
}

/**
 * 随机emoj
 * @param evt
 */
export function createEmoj(evt: GroupMessageEvent) {
  let message = evt.raw_message;
  if (mihoyoReg.emoj.test(message)) {
    let len = emojs.length;

    evt.reply(segment.image(emojs[randNum(len)]!));
  }
}

/**
 * bing图片
 * @param evt
 */
export function createBing(evt: GroupMessageEvent) {
  let message = evt.raw_message;
  if (wallpaperReg.bing.test(message)) {
    //evt.reply(replyMsg.searchImg);
    let arr = message.split("#", 2);
    if (arr[1]) {
      bingApi(+arr[1]!)
        .then((res: string[]) => {
          let len = res.length;
          let randomImg = res[randNum(len)]!;
          evt.reply(segment.image(randomImg));
        })
        .catch((err) => {
          evt.reply(replyMsg.errMsg(err));
        });
    }
  }
}

/**
 * wallhaven爬虫
 * @param evt
 */
export function createWallhaven(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  let par = msg.split("%", 2);

  if (par[1]) {
    let params = [...paramMap.keys()];

    if (params.includes(par[1]!)) {
      //evt.reply(replyMsg.searchImg);
      wallhavenApi(par[1]!)
        .then((res: string[]) => {
          let len = res.length;
          let randomImg = res[randNum(len)]!;
          evt.reply(segment.image(randomImg));
        })
        .catch((err) => {
          evt.reply(replyMsg.errMsg(err));
        });
    }
  }
}

/**
 * 米游社cos
 * @param evt
 */
export function createCos(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.cos.test(msg)) {
    //evt.reply(replyMsg.searchImg);
    getCos()
      .then((res: string[][]) => {
        let randomArtile: string[] = res[randNum(40)]!;
        evt.reply([
          ...randomArtile?.map((item) => {
            return segment.image(item);
          }),
        ]);
      })
      .catch((err) => {
        evt.reply(replyMsg.errMsg(err));
      });
  }
}

/**
 * 米游社同人
 * @param evt
 */
export function createTongren(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.tongren.test(msg)) {
    //evt.reply(replyMsg.searchImg);
    getTongren()
      .then((res: string[][]) => {
        let randomArtile: string[] = res[randNum(40)]!;
        evt.reply([
          ...randomArtile?.map((item) => {
            return segment.image(item);
          }),
        ]);
      })
      .catch((err) => {
        evt.reply(replyMsg.errMsg(err));
      });
  }
}

/**
 * 查看表情
 * @param evt
 */
export function createFace(evt: GroupMessageEvent) {
  if (evt.raw_message === "face") {
    evt.reply([segment.face(randNum(300)), "\n表情" + randNum]);
  }
}

/**
 *  撤回和发送群消息
 * @param evt
 */
export function drawback(evt: GroupMessageEvent) {
  if (commonReg.kfc.test(evt.raw_message)) {
    evt.reply(segment.image(readVendorFile("img", "kfc.jpg")));
  }
  if (evt.raw_message === "dice") {
    // 撤回这条消息
    evt.recall();
    // 发送一个骰子
    evt.group.sendMsg(segment.dice());
    // 发送一个戳一戳
    evt.member.poke();
  }
}

/**
 * 帮助信息
 * @param evt
 */
export function help(evt: GroupMessageEvent) {
  if (commonReg.help.test(evt.raw_message)) {
    evt.reply(segment.image(readFileSync(getPup("help", "help.png"))));
  }
}
export function createCli(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (commonReg.cli.test(msg)) {
    let cliArr = msg.split("#", 2);
    if (cliArr[1] == "help") {
      genHelp();
      evt.reply(replyMsg.cmdComplete);
    }
  }
}

/**
 * 360图片
 * @param evt
 */
export async function img360(evt: GroupMessageEvent) {
  let msg = evt.raw_message.split("%");
  try {
    if (wallpaperReg.three.test(evt.raw_message) && msg[1]) {
      evt.reply([...(await get360TypeMap()).keys()].join("\n"));
    }
    let types = [...(await get360TypeMap()).keys()];
    for (const item of types) {
      let reg = new RegExp(`^%${item}$`, "gi");
      if (reg.test(evt.raw_message)) {
        //evt.reply(replyMsg.searchImg);
        let data = await get360Type(msg[1]);
        evt.reply(segment.image(data[randNum(data.length)].url));
      }
    }
  } catch (err) {
    evt.reply(replyMsg.errMsg(err as Error));
  }
}

/**
 * 关闭机器人指令
 * @param evt
 */
export function createAtAction(evt: GroupMessageEvent) {
  if (evt.atme) {
    console.log("发送者" + evt.sender.user_id);
    console.log(commonReg.admin.source);
    let isAdmin = commonReg.admin.test(String(evt.sender.user_id));
    console.log(`管理员?${isAdmin}`);
    console.log(evt.raw_message);
    if (isAdmin) {
      if (commonReg.sleep.test(evt.raw_message)) {
        evt.reply("已暂停");
        sleep();
        return;
      } else if (commonReg.getup.test(evt.raw_message)) {
        evt.reply(["我复活啦!", segment.face(99)]);
        getUp();
        return;
      }
    }

    createAtEvent(evt);
  }
}

/**
 * 米游社wiki图片
 * @param evt
 */
export async function createGenshinAvatar(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.char.test(msg)) {
    let arr = msg.split("#", 2);
    if (arr[1]) {
      //evt.reply(replyMsg.searchImg);
      let charMap = await getCharacterAvatar();
      let charItem = charMap.find((item) => {
        return item.name == arr[1];
      });
      evt.reply([arr[1], segment.image(charItem!.src)]);
    }
  }
}

export async function getPoetry(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (commonReg.poetry.test(msg)) {
    evt.reply("搜索诗词中");

    try {
      let res: Poetry = await got("https://v1.jinrishici.com/all.json").json();
      evt.reply(res.content);
    } catch (err) {
      evt.reply(replyMsg.errMsg(err as Error));
    }
  }
}
export async function createRealPixiv(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.genshin.test(msg)) {
    try {
      let img = await realPixiv();
      console.log(`获取的图片${img}`);
      evt.reply(segment.image(img));
    } catch (e) {
      evt.reply(replyMsg.errMsg(e  as Error));
    }
  }
}
