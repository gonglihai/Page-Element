import type { ButtonClickHandleParam } from "../Types";
import { Log } from "../../util/Log";
import { ElMessage, ElMessageBox } from 'element-plus';
import { post } from "../../util/Api";
import { toIds } from "../../util/IdUtil";
import { tableSelectRowsCountCheck } from "./TableSelectRowsCountCheckEventHandle";

// 内置事件与处理函数映射
const InnerButtonEventHandleMapping: Map<String, (param: ButtonClickHandleParam) => void> = new Map([
  ['inner-add', unsupported],
  ['inner-edit', unsupported],
  ['inner-delete', innerDelete],
]);

/**
 * 内置事件处理函数
 * @param param 
 * @returns boolean true 代表是内置处理函数, false 代表不是内置处理函数
 */
export function innerButtonEventHandle(param: ButtonClickHandleParam): boolean {
  Log.debug('button click', param);
  const eventHandle = InnerButtonEventHandleMapping.get(param.buttonItem.event);
  if (eventHandle) {
    eventHandle(param);
    return true;
  }
  return false;
}

/**
 * 未实现的内置方法
 * @param param .
 */
function unsupported(param: ButtonClickHandleParam) {
  Log.error('button', '暂未实现的内置方法', '按钮配置:', param.buttonItem)
}

/**
 * 内置删除
 * @param tableSelectRows 表格选中行
 */
function innerDelete({ tableSelectRows, buttonItem, page }: ButtonClickHandleParam) {

  // 选中数量检查
  if (tableSelectRowsCountCheck(tableSelectRows, undefined, 1)) {
    return true;
  }

  ElMessageBox.confirm(
    `确认删除这些数据吗? 已选择: ${tableSelectRows?.length} 条`,
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
      type: 'error',
      autofocus: false,
    }
  ).then(() => {
    // 校验 API 可用性
    if (!buttonItem.api) {
      Log.warn('button', '内置删除, 未指定删除 api 地址, 按钮配置:', buttonItem);
      return;
    }
    // 请求API
    const requestParam = { id: toIds(tableSelectRows) };
    Log.debug('button', '内置删除', '请求:', buttonItem.api, '参数:', requestParam)
    post(buttonItem.api, requestParam).then(r => {
      // 刷新表格
      page.tableReloadData();
      // 提示成功
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    }).catch(r => {
      ElMessage({
        type: 'error',
        message: '删除失败, 原因: ' + r.message,
      });
    })
  }).catch(() => { });
}