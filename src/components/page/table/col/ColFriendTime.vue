<!-- 友好时间列 -->
<template>
  <el-table-column :fixed="col.fixed" sortable :prop="col.field" :width="defaultValue(col.width, 95)"
    :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <FriendTime @click.stop v-if="col.field && scope.row[col.field]" :time="scope.row[col.field]"></FriendTime>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import FriendTime from '../../strong/FriendTime.vue'
import type { Col } from '../Types'
import { defaultValue } from '../../util/DefaultValue'

defineProps<{
  col: Col
}>()
</script>
