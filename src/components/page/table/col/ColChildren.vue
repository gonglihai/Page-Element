<!-- 多级表头 -->
<template>
  <el-table-column :fixed="col.fixed" :label="col.name">
    <template v-for="(childrenCol, index) in col.children" :key="'leve_col_' + index">
      <component v-if="childrenCol.show != false" :col="childrenCol" :is="colType(childrenCol)" ref="componentRef" />
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { Col, Tag } from '../Types';
import { colType } from "../col/Index";

const props = defineProps<{
  col: Col & { tag: Tag[] }
}>();

</script>