<!-- 文本 -->
<template>
  <el-table-column :prop="col.field" :label="col.name" :width="col.width" :align="col.align" />
</template>
<script setup lang="ts">
import type { Col } from '../Types';


const props = defineProps<{
  col: Col
}>();

</script>