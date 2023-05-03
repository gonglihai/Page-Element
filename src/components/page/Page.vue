<template>
  <div class="page-container">
    <p-search v-if="config.search" :config="config.search" @reset="searchReset" @search="searchSearch"></p-search>
    <p-button v-if="config.button" :config="config.button" @click="buttonClick"></p-button>
    <p-table v-if="config.table" :config="config.table"></p-table>
    <p-form v-if="config.form"></p-form>
  </div>
</template>
<script setup lang="ts">
import PSearch from './search/Search.vue';
import PButton from './button/Button.vue';
import PTable from "./table/Table.vue";
import PForm from "./form/Index.vue";

import type { Config } from './Config';
import type { ButtonItem } from './button/Types';

defineProps<{
  config: Config
}>()

/**
 * 查询重置
 */
function searchReset() {
  console.log('[page] search reset');
}

/**
 * 查询
 * @param searchForm 
 */
function searchSearch(searchForm: any) {
  console.log('[page] search search', searchForm);
}

/**
 * 操作按钮点击事件
 */
function buttonClick(buttonItem: ButtonItem, event: Event) {
  console.log('[page] button click', buttonItem, event);
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