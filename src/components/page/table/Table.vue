<template>
  <div class="page-table-container">
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <component v-for="col in config.col" :col="col" :is="colType(col.type)" ref="componentRef" />
    </el-table>
    <div class="page-table-pagination-container">
      <el-pagination v-model:current-page="page.pageNumber" v-model:page-size="page.pageSize"
        :page-sizes="config.pageSize ? config.pageSize : [100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="pageChange"
        @current-change="pageChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Table } from './Types';
import { colType } from "./col/Index";
import { get } from "../util/Api";

const props = defineProps<{
  config: Table
}>();

const page = ref({
  pageNumber: 1,  // 页码
  pageSize: 100   // 页大小
});

/**
 * 页变更
 */
function pageChange() {
  // todo bug 触发两次
  loadData(page.value);
}


const loading = ref(false);
const tableData = ref<any[]>([]); // 表格数据
const total = ref(0);             // 数据总数

loadData();
function loadData(query?: any) {
  loading.value = true;
  if (props.config.data) {
    tableData.value.push(...props.config.data);
    loading.value = false;
    return;
  }
  if (props.config.api) {
    get(props.config.api, query).then(r => {
      tableData.value = r.data;
      total.value = r.total ? r.total : r.data;
    }).finally(() => {
      loading.value = false;
    })
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