
/**
 * 默认值
 * @param value 值
 * @param candidate 候选值
 * @returns 
 */
export function defaultValue(value: any, candidate: any) {
  return value ? value : candidate;
}