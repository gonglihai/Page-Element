<template>
  <div class="page-table-container">
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"
      @row-click="handleRowClick" ref="dataTable">
      <component v-for="col in config.col" :col="col" :is="colType(col.type)" ref="componentRef" />
    </el-table>
    <div class="page-table-pagination-container">
      <el-pagination v-model:current-page="page.pageNumber" v-model:page-size="page.pageSize" :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"
        @current-change="pageChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose, defineEmits, computed } from 'vue';
import type { Table } from './Types';
import { colType } from "./col/Index";
import { get } from "../util/Api";
import { Log } from "../util/Log";
import { showStatementFalse, defaultValue } from '../util/DefaultValue';
import { DefaultConfig } from '../DefaultConfig';


const props = defineProps<{
  config: Table,
  selectRows: any[] | undefined
}>();

// #region 分页

// 页大小选项值
const pageSizes = computed<number[]>(() => {
  return defaultValue(props.config.pageSizes, DefaultConfig.table.pageSizes);
});


// 分页
const page = ref({
  pageNumber: 1,  // 页码
  pageSize: pageSizes.value[0] // 页大小
});

/**
 * 页大小变更
 */
function sizeChange() {
  // 设置页码为 1
  page.value.pageNumber = 1;
  loadData();
}

/**
 * 页变更
 */
function pageChange() {
  loadData();
}

// #endregion

const loading = ref(false);       // 加载状态
const tableData = ref<any[]>([]); // 表格数据
const total = ref(0);             // 数据总数


// #region 数据表格
/**
 * 加载数据表格数据
 * 优先使用 config.data 配置数据, api 优先级低
 */
loadData();
function loadData(query?: any) {
  loading.value = true;

  // 当有查询条件时, 页码从 1 查询
  if (query) {
    page.value.pageNumber = 1;
  }

  const params = query ? query : {};
  Object.assign(params, page.value); // 设置 分页

  // 数据来源于静态配置
  if (props.config.data) {
    tableData.value.push(...props.config.data);
    loading.value = false;
    return;
  }

  // 数据来源于api请求
  if (props.config.api) {
    get(props.config.api, params).then(r => {
      Log.debug("table 加载数据", 'param:', params, 'result:', r);
      tableData.value = r.data;
      total.value = r.total ? r.total : r.data;
    }).finally(() => {
      loading.value = false;
    })
  }
}

// #endregion 

/**
 * 外部方法
 */
defineExpose({
  loadData
})


const emit = defineEmits(['update:selectRows']);

// #region 表格行事件
/**
 * 列选择框选中事件
 * @param rows 行
 */
function handleSelectionChange(rows?: any[]) {
  emit('update:selectRows', rows);
}

const dataTable = ref();

/**
 * 行点击事件
 */
function handleRowClick(row: any) {
  // 全局配置行点击选中 且 page 配置没有显示声明为false
  // 全局配置行点击不选中 且 page 配置行选中
  if ((DefaultConfig.table.rowClickSelect && showStatementFalse(props.config.rowClickSelect)) ||
    (!DefaultConfig.table.rowClickSelect && props.config.rowClickSelect)
  ) {
    dataTable.value.toggleRowSelection(row)
  }
}
// #endregion
</script>
<style>
.page-table-container {
  padding: 0.5rem;
}

.page-table-pagination-container {
  margin-top: 0.5rem;
  display: flex;
}
</style>