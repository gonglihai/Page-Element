import type { EpPropMergeType } from 'element-plus/es/utils'

export interface Table {
  api: string // 动态数据数据源 api
  data: any[] // 静态数据
  col: Col[] // 列配置
  pageSizes: number[] // 分页配置
  rowClickSelect?: boolean // 行点击选中, 默认 true
}

export interface Col {
  name?: string // 表头
  field: string // 映射字段名
  type?: string // 类型
  width?: number // 宽度
  align?: EpPropMergeType<StringConstructor, 'left' | 'center' | 'right', unknown> // 水平对齐
  children?: Col[] // 子级表头
}

export interface ColSwitch extends Col {
  api?: string // API 请求地址
  idField: 'id'
}

// 列水平对齐
export enum ColAlign {
  Center,
  Left,
  Right
}

// 标签配置
export interface Tag {
  name: string
  color:
    | EpPropMergeType<StringConstructor, '' | 'success' | 'warning' | 'info' | 'danger', unknown>
    | undefined
}

// 图片
export interface Img {
  height: number | undefined
}
