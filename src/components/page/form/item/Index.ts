import type { Component } from 'vue'
import type { FormItem } from '../Types'
import { Log } from '../../util/Log'


/**
 * 表单项类型key 与 组件映射关系 map
 */
export const FormItemTypeMapping: Map<String, Component> = new Map([
  // ['text', ColText],                            // text 文本
])

/**
 * 表单项类型key 与 组件映射转换
 * @param col 列配置
 */
export function colType(formItem: FormItem): Component {
  // 未指定类型
  if (!formItem.type) {
    return FormItemTypeMapping.get('default') as Component
  }
  const component = FormItemTypeMapping.get(formItem.type)
  if (component) {
    return component
  }
  Log.warn('form', '无法解析的表单项类型:', formItem.type)
  return FormItemTypeMapping.get('default') as Component
}
