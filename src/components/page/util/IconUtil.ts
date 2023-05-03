import * as Icons from "@element-plus/icons-vue";
import type { DefineComponent } from "vue";

/**
 * 图标名称转换到具体的图标类型
 * @param name 名称, 示例: "Plus"
 */
export function transformToIconComponent(name: string): DefineComponent {
  return Icons[name];
}