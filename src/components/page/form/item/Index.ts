import type { Component } from 'vue'
import type { FormItem } from '../Types'
import { Log } from '../../util/Log'

import { ElInput } from 'element-plus'
import ApiRadio from '../../strong/ApiRadio.vue'
import ApiCheckbox from '../../strong/ApiCheckbox.vue'
import ApiSelect from '../../strong/ApiSelect.vue'
import ApiCascader from '../../strong/ApiCascader.vue'
import DateTimePack from '../../strong/DateTimePack.vue'

/**
 * 表单项类型key 与 组件映射关系 map
 */
export const FormItemTypeMapping: Map<String, Component> = new Map([
  ['default', ElInput], // default input 输入框
  ['input', ElInput], // input 输入框
  ['radio', ApiRadio], // 单选框
  ['checkbox', ApiCheckbox], // 选项框
  ['select', ApiSelect], // 下拉框
  ['cascader', ApiCascader], // 级联下拉框
  ['date', DateTimePack], // 日期选择器
  ['datetime', DateTimePack as Component] // 日期时间选择器
])

/**
 * 表单项类型key 与 组件映射转换
 * @param formItem 表单项配置
 */
export function formItemType(formItem: FormItem): Component {
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
