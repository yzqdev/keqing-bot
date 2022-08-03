"use strict";
import { createClient } from "oicq";
import { Loader } from "./event/loader";
import { conf } from "./config";
const account = conf.account;

const bot = createClient(account, {
  data_dir: process.cwd() + "/data",
});

bot
  .on("system.login.slider", function () {
    console.log("输入ticket：");
    process.stdin.once("data", (ticket) =>
      this.submitSlider(String(ticket).trim())
    );
  })
  .login(conf.password);

async function bootstrap() {
  Loader.loader(bot);
}
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

bootstrap();
