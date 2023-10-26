<!-- 开关列 -->
<template>
  <el-table-column sortable :fixed="col.fixed" :prop="col.field" :width="defaultValue(col.width, 70)"
    :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <template v-if="col.field">
        <api-switch :api="col.api" :id="scope.row[idField]" :idField="idField" v-model="scope.row[col.field]"
          @click.stop></api-switch>
      </template>
      <template v-else>
        <api-switch :api="col.api" :id="scope.row[idField]" :idField="idField" @click.stop></api-switch>
      </template>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { ColSwitch } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { computed } from 'vue';
import { DefaultConfig } from '../../DefaultConfig';
import ApiSwitch from "../../form/item/ApiSwitch.vue";

const props = defineProps<{
  col: ColSwitch
}>();

const idField = computed(() => {
  return defaultValue(props.col.idField, DefaultConfig.other.id.idFieldName) as string;
})

</script>