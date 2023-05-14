import type { ButtonItem } from "./Types";
import { Log } from "../util/Log";
import { ElMessage, ElMessageBox } from 'element-plus';
import { post } from "../util/Api";
import { toIds } from "../util/IdUtil";

export function handle(buttonItem: ButtonItem, event: Event, tableSelectRows: any[] | undefined) {

  Log.info('button click', buttonItem, event, tableSelectRows);
  switch (buttonItem.event) {
    case 'inner-add':
      break;
    case 'inner-edit':
      break;
    case 'inner-delete':
      innerDelete(buttonItem, tableSelectRows);
      break;
    default:
  }
}

/**
 * 内置删除
 * @param tableSelectRows 表格选中行
 */
function innerDelete(buttonItem: ButtonItem, tableSelectRows: any[] | undefined) {
  if (!tableSelectRows || !tableSelectRows.length) {
    ElMessage({
      type: 'warning',
      message: '请选择一条数据',
    });
    return;
  }
  ElMessageBox.confirm(
    `确认删除这些数据吗? 已选中 ${tableSelectRows.length} 条数据`,
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'error',
      autofocus: false
    }
  )
    .then(() => {
      if (!buttonItem.api) {
        Log.warn('button', '内置删除, 未指定删除 api 地址, buttonConfig:', buttonItem);
        return;
      }
      // 请求API
      post(buttonItem.api, { id: toIds(tableSelectRows) }).then(r => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }).catch(r => {
        ElMessage({
          type: 'error',
          message: '删除失败, 原因: ' + r.message,
        });
      }).finally(() => {
        // 上层事件, 请求数据表格刷新
      })
    })
    .catch(() => { })
}