import { version } from "../../package.json";
import pc from "picocolors";
import { emojs } from "@/constant/mihoyo";
import { commonReg, mihoyoReg, wallpaperReg } from "@/constant/reg";
import { getCos, getTongren, getTongrenList } from "@/service/mihoyoService";
import {
  genshinData,
  publicData,
  rankData,
  realPixiv,
} from "@/service/pixivService";
import { bingApi, paramMap, wallhavenApi } from "@/service/wallpaper";
import { get360Type, get360TypeMap } from "@/service/360service";
import { getPup, readVendorFile } from "@/util/file";
import { randNum } from "@/util/num";
import { type GroupMessageEvent, segment, Client } from "icqq";
import { getCharacterAvatar } from "@/service/crawler";
import { createAtEvent } from "@/action/atAction";
import type { MemoryUsage, Poetry, XiaojiDict } from "@/interface/global";
import got from "got";
import { readFile } from "fs/promises";
import { genAdmin, genHelp } from "@/cli/help";
import { replyMsg } from "@/constant/constants";
import { addStatus, selectStatus, setStatus } from "@/util/status";
import {
  addAdmin,
  checkAdminExists,
  removeAdmin,
  selectAllAdmins,
} from "@/util/groupAdmin";
import { addBlack, checkBlackExists, selectBlacklists } from "@/util/blacklist";
import { conf } from "@/config";
import { addNote, delNote, type Note, selectNote } from "@/util/note";
import { pipeline } from "node:stream/promises";
import { createWriteStream, existsSync } from "node:fs";

/**
 * trycatch要占一个大括号的位置,算了还是用.catch吧
 * @param evt
 */
export async function createGenshinData(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (mihoyoReg.genshin.test(msg)) {
    //evt.reply(replyMsg.searchImg);
    let msgArr = msg.split("#", 2);
    try {
      if (msgArr[1]) {
        const img = await genshinData(+msgArr[1]);
        let res = img[randNum(30)];
        evt.reply([
          `title:${res?.title}\npid:${res?.picture_id}\n`,
          segment.image(res?.original_url!),
        ]);
      } else {
        const img = await genshinData(randNum(10));
        let res = img[randNum(30)];
        evt.reply([
          `title:${res?.title}\npid:${res?.picture_id}\n`,
          segment.image(res?.original_url!),
        ]);
      }
    } catch (err) {
      evt.reply(replyMsg.errMsg(err as Error));
    }
  }
}
export async function createJoke(evt: GroupMessageEvent) {
  const msg = evt.raw_message;

  try {
    const res = await got('https://api.vvhan.com/api/joke')
    evt.reply(res.body)
  } catch (error) {
    evt.reply(replyMsg.errMsg(error as Error));
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
          let res = img[randNum(16)];
          evt.reply([
            `title:${res?.title}\npid:${res?.picture_id}\n`,
            segment.image(res?.original_url!),
          ]);
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
          let res = img[randNum(16)];
          evt.reply([
            `title:${res?.title}\npid:${res?.picture_id}\n`,
            segment.image(res?.original_url!),
          ]);
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
 * <p>wallhaven爬虫</p>
 * 不要用replace('%',''),replace无法判断%后面是否有值
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
 //使用数据库

  //  got
  //    .get("http://127.0.0.1:8900/api/mihoyo/cos_rand")
  //    .then((item) => {
  //      const data: any[] = JSON.parse(item.body).data.image_list;
  //      const urls = data.slice(0, 4).map((i) => segment.image(i.url));
  //      evt.reply(urls);
  //    })
  //    .catch((err) => {
  //      evt.reply(replyMsg.errMsg(err));
  //    });
 //使用数据库
    // evt.reply(replyMsg.searchImg);
    getCos()
      .then((res: string[][]) => {
        let randomArtile: string[] = res[randNum(40)]!;
        const imgUrls:string[] = randomArtile
          .slice(0,3)
          .filter(Boolean) as string[];
        evt.reply(
          imgUrls.map(i=>segment.image(i))
        );
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
        const urls = randomArtile?.slice(0, 4).map((item) => {
          return segment.image(item);
        });
        evt.reply(urls);
      })
      .catch((err) => {
        evt.reply(replyMsg.errMsg(err));
      });
  }
  if (mihoyoReg.beauty.test(msg)) {
    //evt.reply(replyMsg.searchImg);
    getTongrenList(randNum(100))
      .then((res: string[]) => {
        const urls = res?.slice(0, 2).map((item) => {
          return segment.image(item);
        });
        evt.reply(urls);
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
export async function help(evt: GroupMessageEvent) {
  if (commonReg.help.test(evt.raw_message)) {
    let helpPng = await readFile(getPup("help", "help.png"));
    evt.reply(segment.image(helpPng));
  }
  if (commonReg.showAdminCmd.test(evt.raw_message)) {
    let adminPng = await readFile(getPup("help", "admin.png"));
    evt.reply(segment.image(adminPng));
  }
}
/**
 * cli#help
 * @param evt
 */
export async function createCli(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (commonReg.cli.test(msg)) {
    let cliArr = msg.split("#", 2);
    if (cliArr[1] == "help") {
      console.log("生成帮助文件");
      await genHelp();
      evt.reply(replyMsg.cmdComplete);
    }
    if (cliArr[1] == "admin") {
      console.log("生成admin指令");
      await genAdmin();
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
  try {
    let msg = evt.raw_message.trim().replace(/@\S*\s*/, "");
    let userId = evt.sender.user_id;
    let groupId = evt.group_id;
    let param = msg.split("#", 2);
    let admins = selectAllAdmins(groupId);
    console.log(pc.cyan(admins.join(" ")));

    console.log("发送者" + userId);
    if (selectBlacklists(groupId).includes(userId)) {
      evt.reply(["您已被拉黑", segment.at(userId)]);
      return;
    }
    let isAdmin =
      commonReg.admin.test(String(userId)) || admins.includes(String(userId));
    console.log(`数据库是否存在:${admins.includes(userId)}`);
    console.log(`管理员?${isAdmin}`);
    console.log(msg);
    if (isAdmin) {
      let flag = selectStatus(groupId);
      if (commonReg.sleep.test(msg)) {
        if (userId == conf.master) {
          evt.reply("好的,主人");
          evt.reply([
            "晚安啦",
            segment.image(
              "https://img-static.mihoyo.com/communityweb/upload/1911ab16b4af46252dbd90fc539d4fc5.png",
            ),
          ]);
          if (flag) {
            setStatus(groupId, true);
          } else {
            addStatus(groupId, true);
          }
          return;
        }
        evt.reply("已暂停");

        console.log("是否有group", flag);
        if (flag) {
          setStatus(groupId, true);
        } else {
          addStatus(groupId, true);
        }

        return;
      }
      if (commonReg.getup.test(msg)) {
        if (flag) {
          setStatus(groupId, false);
        } else {
          addStatus(groupId, false);
        }
        evt.reply(["我复活啦!", segment.face(99)]);
        return;
      }
      if (commonReg.setAdmin.test(msg)) {
        let adminFlag = checkAdminExists(groupId, +param[1]!);
        console.log("setadmin 存在?" + adminFlag);
        if (adminFlag) {
          evt.reply(`已设置${param[1]}为机器人管理员`);
        } else {
          addAdmin(groupId, +param[1]!);
          evt.reply(`已设置${param[1]}为机器人管理员`);
        }
        return;
      }
      if (commonReg.noAdmin.test(msg)) {
        let adminFlag = checkAdminExists(groupId, +param[1]!);
        if (adminFlag) {
          removeAdmin(groupId, +param[1]!);
          evt.reply(`${param[1]}不再是机器人管理员`);
        } else {
          evt.reply(`${param[1]}不再是机器人管理员`);
        }
        return;
      }
      if (commonReg.setBlack.test(msg)) {
        let blackFlag = checkBlackExists(groupId, +param[1]!);
        if (blackFlag) {
          evt.reply(`${param[1]}已被拉黑`);
        } else {
          addBlack(groupId, +param[1]!);
          evt.reply(`${param[1]}已被拉黑`);
        }
        return;
      }
    }

    createAtEvent(evt);
  } catch (e) {
    evt.reply((e as Error).message);
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
    try {
      let res: Poetry = await got("https://v1.jinrishici.com/all.json").json();
      evt.reply(res.content);
    } catch (err) {
      evt.reply(replyMsg.errMsg(err as Error));
    }
  }
}
export async function getWeather(evt: GroupMessageEvent, bot: Client) {
  const msg = evt.raw_message;

  let userId = evt.sender.user_id;
  let groupId = evt.group_id;

  let admins = selectAllAdmins(groupId);
  if (msg.includes('debug')) {
    let res1: string[] = await getTongrenList(1);
    let res2: string[] = await getTongrenList(2);
    let res3: string[] = await getTongrenList(3);
    let rand = randNum(8);
    let randomArticle: string = res1[rand]!;
    let randomArticle1: string = res2[rand]!;
    let randomArticle2: string = res3[rand]!;

    console.log(res3)

    bot.sendGroupMsg(869464578, [segment.image(randomArticle), segment.image(randomArticle1), segment.image(randomArticle2)]);

  }

}
export async function sendVideo(evt: GroupMessageEvent) {
  const msg = evt.raw_message;

  let userId = evt.sender.user_id;
  let groupId = evt.group_id;

  let admins = selectAllAdmins(groupId);
  console.log(pc.cyan(admins.join(" ")));

  console.log("发送者" + userId);
  if (selectBlacklists(groupId).includes(userId)) {
    evt.reply(["您已被拉黑", segment.at(userId)]);
    return;
  }
  let isAdmin =
    commonReg.admin.test(String(userId)) || admins.includes(String(userId));

  if (msg.includes("douyin") && isAdmin) {
    let arr = msg.split("#", 2);
    if (arr[1]) {
      const id = arr[1];
      const videoFs = `./videos/${id}.mp4`;

      if (!existsSync(videoFs)) {
        const data = await got.get("http://localhost:4000/video?videoId=" + id);
        const url = JSON.parse(data.body).url;
        await pipeline(got.stream(url), createWriteStream(videoFs));
        await evt.reply(segment.video(videoFs));
      } else {
        await evt.reply(segment.video(videoFs));
      }
    }
  }
}
export async function getXiaojiDict(evt: GroupMessageEvent) {
  let msg = evt.raw_message;
  if (commonReg.dict.test(msg)) {
    let [_, searchWord] = msg.split("#", 2);

    try {
      let { data } = (await got
        .post("https://api.jikipedia.com/go/search_entities", {
          json: {
            page: 1,
            phrase: searchWord!.trim(),
            size: 60,
          },
        })
        .json()) as { data: XiaojiDict[] };
      let res = data.slice(3).map((item) => {
        return item.definitions[0]?.content;
      });
      evt.reply(res.join("\n\n"));
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
      evt.reply(replyMsg.errMsg(e as Error));
    }
  }
}

/**
 * 一些简单的对话
 * @param evt
 */
export function createDialog(evt: GroupMessageEvent) {
  if (evt.raw_message == "hhh") {
    console.log("hhh");
    evt.reply("笑什么笑");
  }
}
export function createVersionAction(evt: GroupMessageEvent) {
  if (commonReg.version.test(evt.raw_message.trim())) {
    const used: MemoryUsage = process.memoryUsage();
    let mem: number = Math.round((used.rss / 1024 / 1024) * 100) / 100;

    console.log("mem=>");
    console.log(mem);
    let versionInfo = `版本:${version}\n使用内存:${mem}MB`;
    evt.group.sendMsg(versionInfo);
  }
}

/**
 * 添加记事
 * @param userId qq
 * @param msg
 * @param evt
 * @returns
 */
export function addGroupNote(
  userId: number,
  msg: string,
  evt: GroupMessageEvent,
) {
  if (commonReg.addNote.test(msg)) {
    console.log(userId);
    let noteStr = msg.split("#", 2);
    let [content, tag] = noteStr[1]?.split(".", 2)!;
    console.log(content, tag);
    addNote(content!, tag!, userId);
    evt.reply("完成");
    return;
  }
}
/**
 * 查记事
 * @param userId
 * @param msg
 * @param evt
 * @returns
 */
export function getGroupNote(
  userId: number,
  msg: string,
  evt: GroupMessageEvent,
) {
  if (commonReg.getNote.test(msg)) {
    let notes = selectNote(userId) as Note[];
    if (notes) {
      let head = "id,tag,content\n";
      let res = notes.map((item) => {
        return `${item.id},${item.tag},${item.content}`;
      });
      evt.reply(head + res.join("\n"));
    } else {
      evt.reply("对不起,您没有记事");
    }
    return;
  }
}
/**
 * 删除记事
 * @param userId
 * @param msg
 * @param evt
 * @returns
 */
export function delGroupNote(
  userId: number,
  msg: string,
  evt: GroupMessageEvent,
) {
  if (commonReg.delNote.test(msg)) {
    let [_, noticeId] = msg.split("#", 2);
    delNote(+noticeId!, userId);
    evt.reply("删除成功");
    return;
  }
}
