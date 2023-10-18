<!-- 开关列 -->
<template>
  <el-table-column sortable :prop="col.field" :width="defaultValue(col.width, 70)"
    :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <api-switch :api="col.api" :id="scope.row[idField]" :idField="idField" v-model="scope.row[col.field]"></api-switch>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { ColSwitch } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { computed } from 'vue';
import { DefaultConfig } from '../../DefaultConfig';
import ApiSwitch from "../../strong/ApiSwitch.vue";

const props = defineProps<{
  col: ColSwitch
}>();

const idField = computed(() => {
  return defaultValue(props.col.idField, DefaultConfig.other.id.idFieldName);
})

</script>