import type { EpPropMergeType } from "element-plus/es/utils"

export interface Table {
  api: string,
  data: any[],
  col: Col[],
  pageSize: number[]
}

export interface Col {
  name: string,   // 表头
  field: string,  // 映射字段名
  type: string,    // 类型
  width: number,  // 宽度
  align: EpPropMergeType<StringConstructor, "left" | "center" | "right", unknown> | undefined // 水平对齐
}

export enum ColType {
  Index,        // 序号
  Text,         // 文本
  CheckBox,     // 选择框
  Tag,          // 标签
  FirendTime,   // 友好时间
  RichText,     // 富文本
  Img,          // 图片
  File,         // 文件
  Button,        // 按钮
}

export enum ColAlign {
  Center,
  Left,
  Right
}