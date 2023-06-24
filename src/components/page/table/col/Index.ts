import type { Component } from "vue";
import Col from "./Col.vue";
import ColIndex from "./ColIndex.vue";
import ColSelection from "./ColSelection.vue";
import ColButton from "./ColButton.vue";
import ColFriendTime from "./ColFriendTime.vue";
import Tag from "./ColTag.vue";

export const ColTypeMapping: Map<String, Component> = new Map([
  ['default', Col] as [String, Component],
  ['text', Col],
  ['index', ColIndex],
  ['selection', ColSelection],
  ['button', ColButton],
  ['friend-time', ColFriendTime],
  ['tag', Tag]
]);

/**
 * type name 与 组件映射转换
 * @param type 类型名称
 */
export function colType(type: string): Component {
  const component = ColTypeMapping.get(type);
  if (component) {
    return component;
  }
  return ColTypeMapping.get('default') as Component;
}