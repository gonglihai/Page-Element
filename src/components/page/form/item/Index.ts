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

export interface FormItemType {
  component: any // vue 组件
  validatorTrigger: 'blur' | 'change'
  placeholder: string | ((formItem: FormItem) => string)
}

const defaultType = {
  component: ElInput,
  validatorTrigger: 'change',
  placeholder: '请输入'
} as FormItemType

/**
 * 表单项类型key 与 组件映射关系 map
 */
export const FormItemTypeMapping: Map<String, FormItemType> = new Map([
  // default input 输入框
  ['default', defaultType],
  // input 输入框
  ['input', defaultType],
  // textarea 文本域
  ['textarea', defaultType],
  // number 数字输入框
  ['number', { component: ElInputNumber, validatorTrigger: 'blur', placeholder: '请输入' }],
  // slider 滑块
  ['slider', { component: ElSlider, validatorTrigger: 'change', placeholder: '请选择' }],
  // radio 单选框
  ['radio', { component: ApiRadio, validatorTrigger: 'change', placeholder: '请选择' }],
  // checkbox 选项框
  ['checkbox', { component: ApiCheckbox, validatorTrigger: 'change', placeholder: '请选择' }],
  // select 下拉框
  ['select', { component: ApiSelect, validatorTrigger: 'change', placeholder: '请选择' }],
  // cascader 级联下拉框
  ['cascader', { component: ApiCascader, validatorTrigger: 'change', placeholder: '请选择' }],
  // date 日期选择器
  ['date', { component: DateTimePickerPack, validatorTrigger: 'change', placeholder: '请选择' }],
  // datetime 日期时间选择器
  ['datetime', { component: DateTimePickerPack, validatorTrigger: 'change', placeholder: '请选择' }],
  // time 时间选择器
  ['time', { component: TimePickerPack, validatorTrigger: 'change', placeholder: '请选择' }],
  // 图标选择器
  ['icon', { component: IconSelect, validatorTrigger: 'change', placeholder: '请选择' }]
])

/**
 * 表单项类型key 与 组件映射转换
 * @param formItem 表单项配置
 */
export function formItemTypeComponent(formItem: FormItem): Component {
  const a = formItemType(formItem);
  console.log(a);
  return a.component
}

export function formItemType(formItem: FormItem): FormItemType {
  if (!formItem.type) {
    return defaultType
  }
  const type = FormItemTypeMapping.get(formItem.type)
  if (!type) {
    Log.warn('form', '无法解析的表单项类型:', formItem.type)
    return defaultType
  }
  return type
}
