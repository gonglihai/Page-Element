<!-- 友好时间列 -->
<template>
  <el-table-column :width="defaultValue(col.width, 170)" :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <FriendTime v-if="col.field && scope.row[col.field]" :time="scope.row[col.field]"></FriendTime>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import FriendTime from "./FriendTime.vue";
import type { Col } from '../Types';
import {defaultValue} from "../../util/DefaultValue";

const props = defineProps<{
  col: Col
}>();
</script>