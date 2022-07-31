import { Client } from "oicq";

import { CronJob } from "./cronJob";

import { PrivateEvent } from "./privateEvent";
import { RequestEvent } from "./requestEvent";
import { GroupEvent } from "./groupEvent";
import { OnlineEvent } from "@/event/onlineEvent";

export class Loader {
  public static loader(bot: Client) {
    new OnlineEvent().load(bot);
    new GroupEvent().load(bot);
    new CronJob().load(bot);
    new RequestEvent().load(bot);
    new PrivateEvent().load(bot);
  }
}
