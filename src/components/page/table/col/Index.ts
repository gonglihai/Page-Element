import type { Component } from 'vue'
import { Log } from '../../util/Log'
import ColText from './ColText.vue'
import ColIndex from './ColIndex.vue'
import ColSelection from './ColSelection.vue'
import ColButton from './ColButton.vue'
import ColFriendTime from './ColFriendTime.vue'
import ColTag from './ColTag.vue'
import ColImg from './ColImg.vue'
import ColSwitch from './ColSwitch.vue'
import ColChildren from './ColChildren.vue'

export const ColTypeMapping: Map<String, Component> = new Map([
  ['default', ColText] as [String, Component],
  ['text', ColText],
  ['index', ColIndex],
  ['selection', ColSelection],
  ['button', ColButton],
  ['friend-time', ColFriendTime],
  ['tag', ColTag],
  ['img', ColImg],
  ['imgs', ColImg],
  ['switch', ColSwitch]
])

/**
 * type name 与 组件映射转换
 * @param col 列配置
 */
export function colType(col: Col): Component {
  // 多级列
  if (col.children && col.children.length) {
    return ColChildren
  }
  // 单级列
  if (!col.type) {
    return ColTypeMapping.get('default')
  }
  const component = ColTypeMapping.get(col.type)
  if (component) {
    return component
  }
  Log.warn('table', '无法解析的列类型:', col.type)
  return ColTypeMapping.get('default') as Component
}
