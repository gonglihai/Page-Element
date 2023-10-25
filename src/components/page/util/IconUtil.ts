import * as Icons from '@element-plus/icons-vue'
import type { DefineComponent } from 'vue'

/**
 * 图标名称转换到具体的图标类型
 * @param name 名称, 示例: "Plus"
 */
export function transformToIconComponent(
  name: string | null | undefined
): DefineComponent | undefined {
  if (!name) {
    return undefined
  }
  const find = Object.entries(Icons).find((entity) => entity[0] === name)
  return find ? find[1] : undefined
}
