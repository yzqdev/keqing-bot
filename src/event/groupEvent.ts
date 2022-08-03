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
} from "@/action/groupAction";
import { Client, GroupMessageEvent } from "oicq";
import {selectSleep} from "@/util/status";

export class GroupEvent extends AbstractEvent {
  public load(bot: Client): void {
    bot.on("message.group", async function (evt: GroupMessageEvent) {
      if (evt.atme) {
        createAtAction(evt);
        return
      }

      let sleep = selectSleep(+evt.group_id)
      console.log(pc.cyan(`sleep状态:${sleep}`));
      if (sleep) {

        return;
      }
      if (!evt.atme) {
        createGenshinAvatar(evt);
        //排行图片
        createPixivRanking(evt);
        // 推荐图片
        createPixivPublic(evt);
        createGenshinData(evt);
        //米哈游表情
        createEmoj(evt);
        getPoetry(evt);
        createDialog(evt);
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
      }
    });
  }
}
