<template>
  <div class="page-container">
    <p-search v-if="config.search" :config="config.search" @reset="searchReset" @search="searchSearch"></p-search>
    <p-button v-if="config.button" :config="config.button" @click="buttonClick"></p-button>
    <p-table v-if="config.table" :config="config.table" ref="pageTable" v-model:selectRows="tableSelectRows"></p-table>
    <p-form v-if="config.form"></p-form>
  </div>
</template>
<script setup lang="ts">
import PSearch from './search/Search.vue';
import PButton from './button/Button.vue';
import PTable from "./table/Table.vue";
import PForm from "./form/Index.vue";
import { Log } from "./util/Log";
import type { Config } from './Config';
import type { ButtonItem } from './button/Types';
import { ref } from 'vue';
import { handle } from './button/EventHandle';

defineProps<{
  config: Config
}>()


const pageTable = ref(null);  // 数据表格组件
/**
 * 查询重置
 */
function searchReset(searchForm: any) {
  (pageTable.value as unknown as { loadData: (param: any) => undefined }).loadData(searchForm);
}
/**
 * 查询
 */
function searchSearch(searchForm: any) {
  (pageTable.value as unknown as { loadData: (param: any) => undefined }).loadData(searchForm);
}

const tableSelectRows = ref<any[] | undefined>([]); // 数据表格选择的行

/**
 * 操作按钮点击事件
 */
function buttonClick(buttonItem: ButtonItem, event: Event) {
  handle(buttonItem, event, tableSelectRows.value);
}

</script>
<style scoped>
.page-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>