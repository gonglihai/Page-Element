<!-- 文本 -->
<template>
  <el-table-column sortable :fixed="col.fixed" :prop="col.field" :label="col.name" :width="col.width" :align="col.align" />
</template>
<script setup lang="ts">
import type { Col } from '../Types';


defineProps<{
  col: Col
}>();

</script>