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
   * 管理员qq列表
   */
  adminList: number[];
}
export interface Poetry {
  content: string;
  origin: string;
  author: string;
  category: string;
}
