/**
 * 获取最大值为{limit}的随机数
 * @param limit 最大值
 */
export function randNum(limit: number): number {
  return Math.floor(Math.random() * limit);
}
