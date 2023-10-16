<template>
  <el-popover :width="popoverWidth" trigger="click">
    <template #reference>
      <el-button style="margin-left: 0.5rem" :icon="Operation" title="切换显示列"></el-button>
    </template>
    <div style="width: 100%; display: flex;flex-direction:column;align-items:center;  ">
      <div style="margin-bottom: 0.5rem;max-height: 50vh; overflow: auto;">
        <col-show-item v-for="(colItem, key) in col" :key="key" :col="colItem"></col-show-item>
      </div>
      <div style="width: 100%">
        <el-button-group>
          <el-button size="small">全显</el-button>
          <el-button size="small">全不显</el-button>
          <el-button size="small">反显</el-button>
        </el-button-group>
      </div>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import { Operation, } from '@element-plus/icons-vue';
import type { Col } from '../Types';
import { defineProps, computed } from 'vue';
import ColShowItem from './ColShowItem.vue';

const props = defineProps<{
  col: Col[],
}>()

const popoverWidth = computed(() => {
  return (8.5 * colDeep.value) + 'rem';
})

const colDeep = computed(() => {
  return getTreeDeep(props.col);
})

function getTreeDeep(nodes: any[]) {
  let deep = 0;
  nodes.forEach(node => {
    if (node.children && node.children.length) {
      deep = Math.max(deep, getTreeDeep(node.children) + 1);
    } else {
      deep = Math.max(deep, 1);
    }
  })
  return deep;
}
</script>