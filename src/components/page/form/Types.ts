export interface Form {
  addApi?: string
  editApi?: string
  item?: FormItem[]
}

export interface FormItem {
  name?: string
  field?: string
  type?: string
}

export interface FormItemSelect extends FormItem {
  api?: string
}
