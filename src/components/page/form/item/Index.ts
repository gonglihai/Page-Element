import type { Component } from 'vue'
import type { FormItem } from '../Types'
import { Log } from '../../util/Log'

import { ElInput, ElInputNumber, ElSlider } from 'element-plus'
import ApiRadio from '../../strong/ApiRadio.vue'
import ApiCheckbox from '../../strong/ApiCheckbox.vue'
import ApiSelect from '../../strong/ApiSelect.vue'
import ApiCascader from '../../strong/ApiCascader.vue'
import DateTimePickerPack from '../../strong/DateTimePickerPack.vue'
import TimePickerPack from '../../strong/TimePickerPack.vue'
import IconSelect from '../../strong/IconSelect.vue'
/**
 * 表单项类型key 与 组件映射关系 map
 */
export const FormItemTypeMapping: Map<String, Component> = new Map([
  ['default', ElInput], // default input 输入框
  ['input', ElInput], // input 输入框
  ['textarea', ElInput], // textarea 文本域
  ['number', ElInputNumber], // number 数字输入框
  ['slider', ElSlider], // slider 滑块
  ['radio', ApiRadio], // radio 单选框
  ['checkbox', ApiCheckbox], // checkbox 选项框
  ['select', ApiSelect], // select 下拉框
  ['cascader', ApiCascader], // cascader 级联下拉框
  ['date', DateTimePickerPack], // date 日期选择器
  ['datetime', DateTimePickerPack], // datetime 日期时间选择器
  ['time', TimePickerPack], // time 时间选择器
  ['icon', IconSelect as Component] // 图标选择器
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
