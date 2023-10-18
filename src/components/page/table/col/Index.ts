import type { Component } from 'vue'
import type { Col } from '../Types'
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

/**
 * 列类型key 与 组件映射关系 map
 */
export const ColTypeMapping: Map<String, Component> = new Map([
  ['default', ColText] as [String, Component],  // 默认, text 文本
  ['text', ColText],                            // text 文本
  ['index', ColIndex],                          // index 序号
  ['selection', ColSelection],                  // selection CheckBox 选择器
  ['button', ColButton],                        // button 按钮
  ['friend-time', ColFriendTime],               // friend-time 友好时间
  ['tag', ColTag],                              // tag 标签
  ['img', ColImg],                              // img 图片
  ['imgs', ColImg],                             // imgs 多图
  ['switch', ColSwitch]                         // switch 开关
])

/**
 * 列类型key 与 组件映射转换
 * @param col 列配置
 */
export function colType(col: Col): Component {
  // 多级列
  if (col.children && col.children.length) {
    return ColChildren
  }
  // 单级列
  // 未指定类型
  if (!col.type) {
    return ColTypeMapping.get('default') as Component
  }
  const component = ColTypeMapping.get(col.type)
  if (component) {
    return component
  }
  Log.warn('table', '无法解析的列类型:', col.type)
  return ColTypeMapping.get('default') as Component
}
