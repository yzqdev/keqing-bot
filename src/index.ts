"use strict";
import { createClient } from "oicq";
import { Loader } from "./event/loader";
import { conf } from "./config";
const account = conf.account;

const bot = createClient(account, {
  data_dir: process.cwd() + "/data",
});
bot.on("system.login.device", () => {
  bot.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");
  bot.sendSmsCode();
  process.stdin.once("data", (input) => {
    bot.submitSmsCode(input.toString());
   
  });
});
bot
  .on("system.login.slider", function () {
    console.log("输入ticket：");
    process.stdin.once("data", (ticket) =>
      this.submitSlider(String(ticket).trim())
    );
  })
   
bot.on("system.login.qrcode", () => {
  bot.logger.mark("手机扫码完成后按下回车键继续。");
  process.stdin.once("data", () => {
    bot.login();
    
  });
}) 

bot.login(conf.password);


async function bootstrap() {
  Loader.loader(bot);
}
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

bootstrap();
