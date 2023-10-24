// 数组工具类

import { DefaultConfig } from '../DefaultConfig'

const defaultType = DefaultConfig.other.array.type
const defaultDelimiter = DefaultConfig.other.array.delimiter

/**
 * 从对象数组(array)中取属性名(field)对应的属性值根据数组类型(type)生成属性值数组或指定分隔符(delimiter)分隔的属性值字符串
 * @param array 数组
 * @param field 属性名
 * @param type  展现方式 "array" 数组, "string" 指定 delimiter 分隔符分隔的字符串
 * @param delimiter 分隔符
 * @returns [] | [1, 2, 3, ...] | "" | "1,2,3,..."
 */
export function entityArrayToFiledArray<R>(
  array: any[] | undefined,
  field: string,
  type: string = defaultType,
  delimiter: string = defaultDelimiter
): Array<R> | string {
  switch (type) {
    case 'array':
      return entityArrayTransformFieldArray(array, field)
    case 'string':
    default:
      return entityArrayTransformFieldArrayString(array, field, delimiter)
  }
}

/**
 * 从对象数组(array)中取属性名(field)对应的属性值, 生成属性值数组
 * @param array 对象数组
 * @param field 属性名
 * @returns [] | [1, 2, 3, 4, 5, ...]
 */
export function entityArrayTransformFieldArray<R>(
  array: any[] | undefined,
  field: string
): Array<R> {
  if (!array || !array.length) {
    return []
  }
  return array.map((item) => item[field])
}

/**
 * 从对象数组(array)中取属性名(field)对应的属性值, 生成指定分隔符(delimiter)分隔的属性值字符串
 * @param array     对象数组
 * @param field     属性名
 * @param delimiter 分隔符
 * @returns "" | "1,2,3,4,5..."
 */
export function entityArrayTransformFieldArrayString(
  array: any[] | undefined,
  field: string,
  delimiter: string = defaultDelimiter
): string {
  if (!array || !array.length) {
    return ''
  }
  return array.map((item) => item[field]).join(delimiter)
}

/**
 * 将属性数组转换为 数组
 * @param a         属性数组, 可能为 array, string, undefined
 * @param type      属性数组展现方式, "array", "string"
 * @param delimiter 分隔符
 */
export function toArray(
  a: Array<any> | string | undefined,
  type: string = defaultType,
  delimiter: string = defaultDelimiter
): Array<any> {
  if (type == 'string' && typeof a == 'string') {
    return toArrayformString(a, delimiter)
  }
  if (type == 'array' && a instanceof Array) {
    return a
  }
  return []
}

/**
 * 将数组或字符串转为所需要的值
 * @param a 数组或字符串
 * @param type 值展现方式, "array", "string"
 * @param delimiter 分隔符
 * @returns type 得类型
 */
export function toValue(
  a: Array<any> | string | undefined,
  type: string = defaultType,
  delimiter: string = defaultDelimiter
) {
  if (!a) {
    return type == 'string' ? '' : []
  }
  if (typeof a == 'string' && type == 'array') {
    return a.split(delimiter)
  }
  if (a instanceof Array && type == 'string') {
    return a.join(delimiter)
  }
  return a
}

/**
 * 将字符串以指定分隔符进行分割, 返回分割后的数组
 * @param arrayString 以指定分隔符分隔的字符串
 * @param delimiter   分隔符
 * @returns [] | [1, 2, 3, 4, 5, ...]
 */
export function toArrayformString(
  arrayString: string | undefined,
  delimiter: string = defaultDelimiter
): Array<string> {
  return arrayString ? arrayString.split(delimiter) : []
}

/**
 * 是否为空
 * @param array 数组
 * @returns true 为空, false 不为空
 */
export function isEmpty(array: any[] | undefined | null): boolean {
  return !array || !array.length
}

/**
 * 是否不为空
 * @param array  数组
 * @returns  true 不为空, false 为空
 */
export function isNotEmpty(array: any[] | undefined | null): boolean {
  return !isEmpty(array)
}
