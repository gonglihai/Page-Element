<!-- checkbox 列 -->
<template>
  <el-table-column :fixed="col.fixed" type="selection" :width="defaultValue(col.width, 40)"
    :align="defaultValue(col.align, 'center')" />
</template>
<script setup lang="ts">
import { defaultValue } from '../../util/DefaultValue';
import type { Col } from '../Types';


const props = defineProps<{
  col: Col
}>();

</script>