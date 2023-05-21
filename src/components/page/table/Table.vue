<template>
  <div class="page-table-container">
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"
      @row-click="handleRowClick" ref="dataTable">
      <component v-for="col in config.col" :col="col" :is="colType(col.type)" ref="componentRef" />
    </el-table>
    <div class="page-table-pagination-container">
      <el-pagination v-model:current-page="page.pageNumber" v-model:page-size="page.pageSize"
        :page-sizes="config.pageSize ? config.pageSize : defaultPageSizes"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"
        @current-change="pageChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose, defineEmits } from 'vue';
import type { Table } from './Types';
import { colType } from "./col/Index";
import { get } from "../util/Api";
import { Log } from "../util/Log";
import { showStatementFalse } from '../util/DefaultValue';

// todo 存储到默认配置, 数据表格>每页显示个数选择器的选项设置	
const defaultPageSizes = [100, 200, 300, 400];

const props = defineProps<{
  config: Table,
  selectRows: any[] | undefined
}>();

const page = ref({
  pageNumber: 1,  // 页码
  pageSize: defaultPageSizes[0]   // 页大小
});

/**
 * 页大小变更
 */
function sizeChange() {
  // 设置页码为 1
  page.value.pageNumber = 1;
  loadData(page.value);
}

/**
 * 页变更
 */
function pageChange() {
  loadData(page.value);
}

const loading = ref(false);       // 加载状态
const tableData = ref<any[]>([]); // 表格数据
const total = ref(0);             // 数据总数

/**
 * 加载数据表格数据
 * 优先使用 config.data 配置数据, api 优先级低
 */
loadData();
function loadData(query?: any) {
  loading.value = true;

  const params = query ? query : {};
  Object.assign(params, page.value); // 设置 分页
  if (props.config.data) {
    tableData.value.push(...props.config.data);
    loading.value = false;
    return;
  }
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



/**
 * 外部方法
 */
defineExpose({
  loadData
})


const emit = defineEmits(['update:selectRows']);

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
  if (showStatementFalse(props.config.rowClickSelect)) {
    dataTable.value.toggleRowSelection(row)
  }
}

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