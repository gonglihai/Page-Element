import type { Component } from "vue";
import { Log } from "../../util/Log";
import Col from "./Col.vue";
import ColIndex from "./ColIndex.vue";
import ColSelection from "./ColSelection.vue";
import ColButton from "./ColButton.vue";
import ColFriendTime from "./ColFriendTime.vue";
import ColTag from "./ColTag.vue";
import ColImg from "./ColImg.vue";

export const ColTypeMapping: Map<String, Component> = new Map([
  ['default', Col] as [String, Component],
  ['text', Col],
  ['index', ColIndex],
  ['selection', ColSelection],
  ['button', ColButton],
  ['friend-time', ColFriendTime],
  ['tag', ColTag],
  ['img', ColImg],
  ['imgs', ColImg]
]);

/**
 * type name 与 组件映射转换
 * @param type 类型名称
 */
export function colType(type: string | undefined): Component {
  if (!type) {
    return colType('default');
  }
  const component = ColTypeMapping.get(type);
  if (component) {
    return component;
  }
  Log.warn('table', '无法解析的列类型:', type);
  return ColTypeMapping.get('default') as Component;
}