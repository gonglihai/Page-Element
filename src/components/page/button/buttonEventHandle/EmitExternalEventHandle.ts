import type { ButtonClickHandleParam } from "../Types";

/**
 * emit 外部事件处理器, 调用 emit 方法, 由 Page.vue 产生自定义事件, 交由外部处理
 */
export function emitExternalEventHandle({ page }: ButtonClickHandleParam): boolean {
  page.$_buttonClickEvent();
  return true;
}