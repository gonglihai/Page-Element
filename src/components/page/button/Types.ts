import type { EpPropMergeType } from "element-plus/es/utils";

/**
 * 按钮配置
 */
export interface ButtonItem {
  icon: string,   // 图标
  name: string,   // 名称
  event: string,  // 事件
  color: EpPropMergeType<StringConstructor, "default" | "success" | "warning" | "info" | "primary" | "danger", unknown> | undefined   // 颜色
  api?: string,   // 事件请求地址

  // 表格选中数量
  selectCount?: number, // 表格选中数量
  maxCount?: number,    // 表格最大选中数量
  minCount?: number,    // 表格最小选中数量
}

/**
 * 按钮事件处理器参数
 */
export interface ButtonClickHandleParam {
  tableSelectRows: any[] | undefined, // 表格选中数据
  buttonItem: ButtonItem,             // 按钮配置
  event: Event,                       // 按钮点击事件
  page: {                             // page 组件公共函数
    tableReloadData: (search?: any) => void, // 刷新表格数据
    $_buttonClickEvent: () => void      // 按钮点击事件 emit 处理函数, (外部不应调用)
  }
}