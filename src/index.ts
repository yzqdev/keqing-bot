import { createClient } from "icqq";
import { Loader } from "./event/loader";
import { conf } from "./config";
const account = conf.account;

const client = createClient({ platform: 3 });
client.on("system.login.slider", (e) => {
  console.log("输入滑块地址获取的ticket后继续。\n滑块地址:    " + e.url);
  process.stdin.once("data", (data) => {
    client.submitSlider(data.toString().trim());
  });
});
client.on("system.login.qrcode", (e) => {
  console.log("扫码完成后回车继续:    ");
  process.stdin.once("data", () => {
    client.login();
  });
});
client.on("system.login.device", (e) => {
  console.log("请选择验证方式:(1：短信验证   其他：扫码验证)");
  process.stdin.once("data", (data) => {
    if (data.toString().trim() === "1") {
      client.sendSmsCode();
      console.log("请输入手机收到的短信验证码:");
      process.stdin.once("data", (res) => {
        client.submitSmsCode(res.toString().trim());
      });
    } else {
      console.log("扫码完成后回车继续：" + e.url);
      process.stdin.once("data", () => {
        client.login();
      });
    }
  });
});
client.login(conf.account, conf.password);

async function bootstrap() {
  Loader.loader(client);
}
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

bootstrap();
