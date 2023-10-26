<!-- 序号列 -->
<template>
  <el-table-column :fixed="col.fixed" type="index" :label="defaultValue(col.name, '#')" :width="defaultValue(col.width, 40)"
    :align="defaultValue(col.align, 'center')" />
</template>
<script setup lang="ts">
import { defaultValue } from '../../util/DefaultValue';
import type { Col } from '../Types';


defineProps<{
  col: Col
}>();

</script>