export interface TypeItem {
  id: string;
  name: string;
  order_num: string;
  tag: string;
  create_time: string;
}
export interface BaseRes {
  data: any;
}
export interface BingItem {
  enddate: string;
  fullSrc: string;
  urlbase: string;
  _id: string;
}
export interface BingRes {
  data: BingItem[];
  msg: string;
  code: number;
}
export interface HavenItem {
  raw: string;
  id: string;
  thumb: string;
}
export interface HavenRes {
  data: HavenItem[];
  code: number;
  msg: string;
}
