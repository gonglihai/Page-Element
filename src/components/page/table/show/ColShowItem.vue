<template>
  <div class="col-show-item">
    <label class="col-show-item-operate" :title="name">
      <div class="col-show-item-operate-name">{{ name }}</div>
      <div class="col-show-item-operate-switch"><el-switch size="small" :model-value="showStatementFalse(col.show)"
          @change="onThisChange" /></div>
    </label>
    <div class="col-show-item-children" v-if="col.children && col.children.length">
      <col-show-item ref="childrenColShowNodes" v-for="(childrenCol, key) in col.children" :key="key" :col="childrenCol"
        @change="onChildrenChange"></col-show-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, defineEmits, defineExpose, ref } from 'vue';
import type { Col } from '../Types';
import { showStatementFalse } from '../../util/DefaultValue';

const props = defineProps<{
  col: Col,
}>()

// 计算名称
const name = computed(() => {
  if (props.col.name) {
    return props.col.name;
  }
  switch (props.col.type) {
    case 'index':
      return '#';
    case 'selection':
      return '选择框';
    case 'button':
      return '操作';
    default:
      return '';
  }
});

const emit = defineEmits<{
  (e: 'change', col: Col, show: boolean): void
}>();

/**
 * 本级改变
 * @param val 值
 */
function onThisChange(val: boolean | string | number) {
  const show = !!val;
  emit('change', props.col, show);
  parentShowChange(show);
}


/**
 * 子级改变
 * @param col 子级列
 * @param show 显示状态
 */
function onChildrenChange(col: Col, show: boolean) {
  col.show = show;
  // 无子级
  if (!props.col.children) {
    return;
  }
  // 本级状态与要更改的状态一致, 不在向上级联
  if (showStatementFalse(props.col.show) == show) {
    return;
  }
  // 向上级联
  for (let i = 0; i < props.col.children.length; i++) {
    const item = props.col.children[i];
    if (item.show != false) {
      emit('change', props.col, true);
      return;
    }
  }
  emit('change', props.col, false);
}

// 子级 vue 节点集合
const childrenColShowNodes = ref([]);

/**
 * 父级改变, 设置子级改变
 * @param show 显示状态
 */
function parentShowChange(show: boolean) {
  // eslint-disable-next-line vue/no-mutating-props
  props.col.show = show;
  if (!childrenColShowNodes.value || !childrenColShowNodes.value.length) {
    return;
  }
  childrenColShowNodes.value.forEach((childrenColShowNode: { parentShowChange: (show: boolean) => void; }) => {
    childrenColShowNode.parentShowChange(show);
  });
}

defineExpose({
  parentShowChange
})

</script>

<style>
.col-show-item .col-show-item-operate {
  display: flex;
  width: 7rem;
  justify-content: space-between;
  cursor: pointer;
  flex: none;
}

.col-show-item-operate-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  margin-right: 0.25rem;
}

.col-show-item {
  display: flex;
  align-items: flex-start;
}

.col-show-item-children {
  margin-left: 0.5rem;
}


.col-show-item-operate {
  padding-left: 0.5rem;
  border-left: 2px solid #dcdfe6;
  transition: border-color 0.3s;
  margin-bottom: 2px;
}

.col-show-item-operate:hover {
  border-color: #409eff;
}
</style>