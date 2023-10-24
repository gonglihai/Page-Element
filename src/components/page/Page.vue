<template>
  <div class="page-container">
    <p-search v-if="config.search" :config="config.search" @reset="searchReset" @search="searchSearch"></p-search>
    <p-button v-if="config.button" :config="config.button" @click="buttonClick"></p-button>
    <p-table v-if="config.table" :config="config.table" ref="pageTable" v-model:selectRows="tableSelectRows"></p-table>
    <p-form v-if="config.form" :form="config.form"></p-form>
  </div>
</template>
<script setup lang="ts">
import PSearch from './search/Search.vue';
import PButton from './button/Button.vue';
import PTable from "./table/Table.vue";
import PForm from "./form/PForm.vue";
import { Log } from "./util/Log";
import type { Config } from './Config';
import type { ButtonItem, ButtonClickHandleParam } from './button/Types';
import { ref } from 'vue';
import { buttonEventHandle } from './button/buttonEventHandle/ButtonEventHandle';

defineProps<{
  config: Config
}>()

const emit = defineEmits(['buttonClick']);


/**
 * 查询重置
 */
function searchReset(searchForm: any) {
  tableReloadData(searchForm);
}
/**
 * 查询
 */
function searchSearch(searchForm: any) {
  tableReloadData(searchForm);
}

/**
 * 数据表格重加载
 * @param search 查询条件
 */
const pageTable = ref(null);  // 数据表格组件
function tableReloadData(search: any) {
  (pageTable.value as unknown as { loadData: (param: any) => undefined }).loadData(search);
}

const tableSelectRows = ref<any[] | undefined>([]); // 数据表格选择的行

/**
 * 操作按钮点击事件
 */
function buttonClick(buttonItem: ButtonItem, event: Event) {
  const param = {
    tableSelectRows: tableSelectRows.value,
    buttonItem,
    event,
    page: {
      tableReloadData,
      $_buttonClickEvent: () => emit('buttonClick', param)
    }
  } as ButtonClickHandleParam
  buttonEventHandle(param);
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