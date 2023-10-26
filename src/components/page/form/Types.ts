export interface Form {
  addApi?: string
  editApi?: string
  item?: FormItem[]
}

export interface FormItem {
  name?: string
  field?: string
  type?: string
  required?: boolean // 是否必填
  rule?: [] // 校验规则
}

export interface FormItemSelect extends FormItem {
  api?: string
}
