import type { ButtonItem } from "./button/Types";
import type { Form } from "./form/Types";
import type { SearchItem } from "./search/Types";
import type { Table } from "./table/Types";

export interface Config {
  search: SearchItem[],   // 查询条件
  button: ButtonItem[],   // 操作按钮
  table?: Table,           // 数据表格
  form: Form,             // 自定义表单
}
