// id 工具类

import { DefaultConfig } from "../DefaultConfig";
import { entityArrayToFiledArray } from "./ArrayUtil";

// ids 表现形式, "string" 指定分隔符 (defaultIdsStringDelimiter) 分隔的字符串, "array" 数组
const defaultIdsType = DefaultConfig.other.id.idsType;
// 当 ids 表现形式为 "string" 时, 分隔的分隔符
const defaultIdsStringDelimiter = DefaultConfig.other.id.idsStringDelimiter;
// 对象数组中, 代表 id 字段的字段名
const defaultIdFieldName = DefaultConfig.other.id.idFieldName;

export function toIds(array: any[] | undefined) {
  return entityArrayToFiledArray(array, defaultIdFieldName, defaultIdsType, defaultIdsStringDelimiter);
}

