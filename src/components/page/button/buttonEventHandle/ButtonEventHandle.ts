import type { ButtonClickHandleParam } from "../Types";
import { innerButtonEventHandle } from "./InnerButtonEventHandle";
import { tableSelectRowsCountCheckEventHandle } from "./TableSelectRowsCountCheckEventHandle";
import { emitExternalEventHandle } from "./EmitExternalEventHandle";

const ButtonEventHandles: Set<(param: ButtonClickHandleParam) => boolean> = new Set([
  tableSelectRowsCountCheckEventHandle, // 数据表格选中数量检查处理器
  innerButtonEventHandle,               // 内置按钮事件处理器
  emitExternalEventHandle               // emit 外部事件处理器
]);

/**
 * 按钮事件处理中心
 * @param param ButtonClickHandleParam
 */
export function buttonEventHandle(param: ButtonClickHandleParam) {
  for (const hanlde of ButtonEventHandles) {
    if (hanlde(param)) {
      return;
    }
  }
}