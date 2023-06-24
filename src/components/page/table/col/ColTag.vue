<!-- 标签列 -->
<template>
  <el-table-column :width="defaultValue(col.width, 170)" :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <el-tag :type="getType(scope).color">{{ getType(scope).name }}</el-tag>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { Col, Tag } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { Log } from '../../util/Log';

const props = defineProps<{
  col: Col & { tag: Tag[] }
}>();

function getType(scope: any): Tag {
  const colValue = scope.row[props.col.field];
  const tag = props.col.tag[colValue];
  if (!tag) {
    Log.error("col-tag 未知的标签类型, 列配置:", props.col, "数据行:", scope)
    return { name: '未知', color: 'danger' };
  }
  return tag;
}
</script>