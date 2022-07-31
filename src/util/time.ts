import { format } from "timeago.js";

export function timeago(time: string | Date) {
  return format(time, "zh_CN");
}
