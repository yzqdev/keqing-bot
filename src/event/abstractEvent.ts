import { Client } from "icqq";

export abstract class AbstractEvent {
  public abstract load(bot: Client): void;
}
