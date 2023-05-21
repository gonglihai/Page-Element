
/**
 * 默认值
 * @param value 值
 * @param candidate 候选值
 * @returns 
 */
export function defaultValue(value: any, candidate: any): any {
  return value ? value : candidate;
}

/**
 * 显示声明为 false 才为 false
 * @param value 值
 * @returns true or false
 */
export function showStatementFalse(value: any | undefined): boolean {
  if (value == undefined || value) {
    return true;
  }
  return false;
}