import type { Client } from "icqq";

export interface Conf {
  /**
   * qq
   */
  account: number;
  /**
   * 密码
   */
  password: string;
  /**
   * 常用群
   */
  preferGroup: number[];
  /**
   * 初始管理员qq列表
   */
  adminList: number[];
  /**
   * 主人qq
   */
  master: number;
  /**
   * 初始黑名单
   */
  blackList: number[];
}
export interface Poetry {
  content: string;
  origin: string;
  author: string;
  category: string;
}
export interface MemoryUsage {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
}
export interface XiaojiDefinition {
  category: string;
  comment_count: number;
  commentable: boolean;
  content: string;
  created_at: string;
  definition_count: number;
  deletable: boolean;
  dislike_count: number;
}
export interface XiaojiDict {
  albums: [];
  banners: [];
  category: string;
  definitions: XiaojiDefinition[];
  tags: [];
  topics: [];
  users: [];
}
export interface MyClient extends Client {
  uin: number;
}
