// id 工具类

import { DefaultConfig } from "../DefaultConfig";

// ids 表现形式, "string" 指定分隔符 (defaultIdsStringDelimiter) 分隔的字符串, "array" 数组
const defaultIdsType = DefaultConfig.other.id.idsType;
// 当 ids 表现形式为 "string" 时, 分隔的分隔符
const defaultIdsStringDelimiter = DefaultConfig.other.id.idsStringDelimiter;
// 对象数组中, 代表 id 字段的字段名
const defaultIdFieldName = DefaultConfig.other.id.idFieldName;

export function toIds(array: any[] | undefined) {
  switch (defaultIdsType) {
    case "array":
      return toIdsArray(array);
    case "string":
    default:
      return toIdsString(array);
  }
}

/**
 * 转换为指定分隔符(默认英文逗号)分隔的id字符串
 * @param array 对象数组
 * @param idField id字段名
 * @param delimiter 分隔符
 * @returns "" | "1,2,3,4,5..."
 */
export function toIdsString(array: any[] | undefined, idField: string = defaultIdFieldName, delimiter: string = defaultIdsStringDelimiter) {
  if (!array || !array.length) {
    return "";
  }
  return array.map(item => item[idField]).join(delimiter);
}

/**
 * 转换为id数组
 * @param array 对象数组
 * @param idField id字段名
 * @returns [] | [1, 2, 3, 4, 5, ...]
 */
export function toIdsArray(array: any[] | undefined, idField: string = defaultIdFieldName) {
  if (!array || !array.length) {
    return [];
  }
  return array.map(item => item[idField]);
}

/**
 * 将逗号分隔的字符串以指定分隔符分割, 返回分割后的数组
 * @param ids 以指定分隔符分隔的字符串
 * @param delimiter 分隔符
 * @returns [] | [1, 2, 3, 4, 5, ...]
 */
export function formIdsString(ids: string | undefined, delimiter: string = defaultIdsStringDelimiter) {
  return ids ? ids.split(delimiter) : [];
}