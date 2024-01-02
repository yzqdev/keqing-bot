import { Client } from "icqq";

import { CronEvent } from "./cronEvent";

import { PrivateEvent } from "./privateEvent";
import { RequestEvent } from "./requestEvent";
import { GroupEvent } from "./groupEvent";
import { OnlineEvent } from "./onlineEvent";
import { NoticeEvent } from "./noticeEvent";

export class Loader {
  public static loader(bot: Client) {
    new OnlineEvent().load(bot);
    new GroupEvent().load(bot);
    new CronEvent().load(bot);
    new RequestEvent().load(bot);
    new NoticeEvent().load(bot);
    new PrivateEvent().load(bot);
  }
}
