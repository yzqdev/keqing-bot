/**
 * 获取最大值为{limit}的随机数
 * @param limit 最大值
 */
export function randNum(limit: number): number {
  return Math.floor(Math.random() * limit);
}
/**
 * 获取一个指定范围内的随机整数
 * @param min - 最小值（包含）
 * @param max - 最大值（不包含）
 * @returns 随机整数
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // 不含最大值，含最小值
}
/**
 * 获取区间内3个随机数
 * @param min 最小值
 * @param max 最大值
 * @param count 随机数数量
 * @returns 
 */
export function getUniqueRandomInt(min=0, max=20,count=3):number[] {
  const randoms = new Set();

  while (randoms.size < count) {
    const random = getRandomInt(min, max);
    randoms.add(random);
     
  }

  return Array.from(randoms) as number[];
}
