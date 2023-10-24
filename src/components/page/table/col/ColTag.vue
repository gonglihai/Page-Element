<!-- 标签列 -->
<template>
  <el-table-column sortable :fixed="col.fixed" :prop="col.field" :width="defaultValue(col.width, 80)"
    :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <el-tag :type="getType(scope).color">{{ getType(scope).name }}</el-tag>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { TagCol, Tag } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { Log } from '../../util/Log';

const props = defineProps<{
  col: TagCol
}>();

function getType(scope: any): Tag {
  if (!props.col.field) {
    Log.error('ColTag 标签列 请配置 field 属性', 'col:', props.col);
    return { name: '未知' };
  }
  const colValue = scope.row[props.col.field];
  const tag = props.col.tag[colValue];
  if (!tag && scope.$index != -1) {
    Log.error("col-tag 未知的标签类型, 列配置:", props.col, "数据行:", scope)
    return { name: '未知' };
  }
  return tag;
}
</script>