import { ElMessage } from 'element-plus';
import type { ButtonClickHandleParam } from '../Types';

/**
 * 表格选中数量检查处理器
 * @param param ButtonClickHandleParam
 * @returns 检查通过 返回 false, 检查失败 返回 true
 */
export function tableSelectRowsCountCheckEventHandle({ tableSelectRows, buttonItem }: ButtonClickHandleParam): boolean {
  return tableSelectRowsCountCheck(tableSelectRows, buttonItem.selectCount, buttonItem.minCount, buttonItem.maxCount);
}

/**
 * 检查选中数量, 检查失败进行提示
 * @param selectDatas 数组
 * @param selectCount 选定数量
 * @param minCount 最小数量
 * @param maxCount 最大数量
 * @returns 检查通过 返回 false, 检查失败 返回 true
 */
export function tableSelectRowsCountCheck(selectDatas: any[] = [], selectCount?: number, minCount?: number, maxCount?: number): boolean {
  // 选中数量检查
  if (selectCount && selectCount != selectDatas.length) {
    ElMessage({
      type: 'warning',
      message: `请选择 ${selectCount} 条数据, 已选择: ${selectDatas.length} 条`,
    });
    return true;
  }
  // 最小数量检查
  if (minCount && minCount > selectDatas.length) {
    ElMessage({
      type: 'warning',
      message: `最少选择 ${minCount} 条数据, 已选择: ${selectDatas.length} 条`,
    });
    return true;
  }
  // 最大数量检查
  if (maxCount && maxCount < selectDatas.length) {
    ElMessage({
      type: 'warning',
      message: `最多选择 ${maxCount} 条数据, 已选择: ${selectDatas.length} 条`,
    });
    return true;
  }

  return false;
}