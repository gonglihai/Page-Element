import type { Component } from 'vue';
import Input from './Input.vue';
import ApiSelect from "./ApiSelect.vue";
import DateRange from "./DateRange.vue";

export const SearchItemMapping: Map<String, Component> = new Map([
  ['default', Input] as [String, Component],
  ['input', Input],
  ['select', ApiSelect],
  ['date-range', DateRange],
  ['time-range', DateRange],
  ['datetime-range', DateRange]
]);

/**
 * 查询条件类型转换到具体的 vue 组件
 * @param type 类型名称
 */
export function searchItemType(type: string): Component {
  const component = SearchItemMapping.get(type);
  if (component) {
    return component;
  }
  return SearchItemMapping.get('default') as Component;
}