import type { EpPropMergeType } from 'element-plus/es/utils'

export interface Table {
  api?: string // 动态数据数据源 api
  data?: any[] // 静态数据
  col?: Col[] // 列配置
  pageSizes?: number[] // 分页配置
  rowClickSelect?: boolean // 行点击选中, 默认 true
}

export interface Col {
  name?: string // 表头
  field?: string // 映射字段名
  type?: string // 类型
  width?: number // 宽度
  align?: EpPropMergeType<StringConstructor, 'left' | 'center' | 'right', unknown> // 水平对齐
  children?: Col[] // 子级表头
  show?: boolean // 是否显示
  fixed?: EpPropMergeType<StringConstructor, 'left' | 'right', unknown>
}

export interface ColSwitch extends Col {
  api?: string // API 请求地址
  idField?: string // id 字段名
}

// 标签配置
export interface TagCol extends Col {
  tag: Tag[]
}

export interface Tag {
  color?: EpPropMergeType<StringConstructor, "" | "danger" | "success" | "warning" | "info", unknown> | undefined
  name?: string
}

// 图片
export interface Img {
  height: number | undefined
}
