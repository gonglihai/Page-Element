<template>
  <el-popover :width="popoverWidth" trigger="click">
    <template #reference>
      <el-button style="margin-left: 0.5rem" :icon="Operation" title="切换显示列">显示列</el-button>
    </template>
    <div style="width: 100%; display: flex;flex-direction:column;align-items:center;  ">
      <div style="margin-bottom: 0.5rem;max-height: 50vh; overflow: auto;">
        <col-show-item v-for="(colItem, key) in col" :key="key" :col="colItem"
          @change="(col, show) => onShowChange(colItem, show)" ref="childrenColShowNodes"></col-show-item>
      </div>
      <div style="width: 100%">
        <el-button-group>
          <el-button size="small" @click="allShowSet(true)">全显</el-button>
          <el-button size="small" @click="allShowSet(false)">全不显</el-button>
          <el-button size="small" @click="reverseShow(col)">反显</el-button>
          <!-- todo 后期实现 -->
          <!-- <el-button size="small">重置</el-button> -->
        </el-button-group>
      </div>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import { Operation, } from '@element-plus/icons-vue';
import type { Col } from '../Types';
import { defineProps, computed, ref } from 'vue';
import ColShowItem from './ColShowItem.vue';
import { showStatementFalse } from '../../util/DefaultValue';
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

/**
 * 子级改变
 * @param col 子级列
 * @param show 显示状态
 */
function onShowChange(col: Col, show: boolean) {
  col.show = show;
}

const childrenColShowNodes = ref([]);

/**
 * 全选/全不选
 * @param show true 全选, false 全不选
 */
function allShowSet(show: boolean) {
  if (!childrenColShowNodes.value || !childrenColShowNodes.value.length) {
    return;
  }
  childrenColShowNodes.value.forEach((childrenColShowNode: { parentShowChange: (show: boolean) => void; }) => {
    childrenColShowNode.parentShowChange(show);
  });
}

/**
 * 反选
 */
function reverseShow(cols: Col[]) {
  let parentShow = false;
  for (let i = 0; i < cols.length; i++) {
    const col = cols[i];
    // 子级不存在, 直接设置反选
    if (!col.children || !col.children.length) {
      const thisShow = !showStatementFalse(col.show);
      col.show = thisShow;
      if (thisShow) {
        parentShow = true;
      }
      continue;
    }
    // 存在子级, 本级状态, 从子级获取
    const thisShow = reverseShow(col.children);
    col.show = thisShow;
    if (thisShow) {
      parentShow = true;
    }
  }
  return parentShow;
}
</script>