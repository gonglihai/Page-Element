import type { EpPropMergeType } from "element-plus/es/utils";

export interface ButtonItem {
  icon: string,   // 图标
  name: string,   // 名称
  event: string,  // 事件
  color: EpPropMergeType<StringConstructor, "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger", unknown> | undefined   // 颜色
}