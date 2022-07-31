import { Client } from "oicq";

export abstract class AbstractEvent {
  public abstract load(bot: Client): void;
}
