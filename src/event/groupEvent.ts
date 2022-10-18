import pc from "picocolors";
import { AbstractEvent } from "@/event/abstractEvent";
import {
  createBing,
  createCli,
  createCos,
  createEmoj,
  createFace,
  createGenshinAvatar,
  createGenshinData,
  createPixivPublic,
  createPixivRanking,
  createAtAction,
  createTongren,
  createWallhaven,
  drawback,
  getPoetry,
  help,
  img360,
  createDialog,
  createVersionAction,
  getXiaojiDict,
} from "@/action/groupAction";
import { Client, GroupMessageEvent, PrivateMessageEvent,  } from "oicq";
import { selectSleep } from "@/util/status";
import { hello } from "@/action/privateGroupAction";
import { selectBlacklists } from "@/util/blacklist";
import {
  addGroupNote,
  delGroupNote,
  getGroupNote,
} from "@/action/groupAction";
 
export class GroupEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.group", async function (evt: GroupMessageEvent) {
      let groupId = evt.group_id;
      let userId = evt.sender.user_id;
      let msg = evt.raw_message;
      if (evt.atme) {
        createAtAction(evt);
        return;
      }

      let sleep = selectSleep(evt.group_id);
      console.log(pc.cyan(`sleep状态:${sleep}`));
      if (sleep) {
        return;
      }
      if (!evt.atme) {
        if (selectBlacklists(groupId).includes(userId)) {
          console.log(pc.cyan('在黑名单'));
          return;
        }
        createGenshinAvatar(evt);
        //排行图片
        createPixivRanking(evt);
        // 推荐图片
        createPixivPublic(evt);
        createGenshinData(evt);
        //米哈游表情
        createEmoj(evt);
        //来一首诗
        getPoetry(evt);
        //词典
        getXiaojiDict(evt)
        // 一些对话
        createDialog(evt);
        createVersionAction(evt);
        //使用pixiv代理
        // createRealPixiv(evt);
        //bing图片
        createBing(evt);
        //wallhavenApi
        createWallhaven(evt);
        //显示cos图片
        createCos(evt);
        //同人图片
        createTongren(evt);
        // 回复表情
        createFace(evt);
        // 撤回和发送群消息
        drawback(evt);
        //帮助消息
        help(evt);
        createCli(evt);
        //360图片
        img360(evt);

        //记事相关
        addGroupNote(userId, msg, evt);
        getGroupNote(userId, msg, evt);
        delGroupNote(userId, msg, evt);
      }
    });

    //临时群消息
    bot.on("message.private.group", async function (evt: PrivateMessageEvent) {
      hello(evt);
    });
  }
}
