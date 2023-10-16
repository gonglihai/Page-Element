<template>
  <div class="col-show-item">
    <label class="col-show-item-operate" :title="name">
      <div class="col-show-item-operate-name">{{ name }}</div>
      <div><el-switch size="small" v-model="show" /></div>
    </label>
    <div class="col-show-item-children" v-if="col.children && col.children.length">
      <col-show-item v-for="(childrenCol, key) in col.children" :key="key" :col="childrenCol"></col-show-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import type { Col } from '../Types';

const props = defineProps<{
  col: Col,
}>()

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
})



const show = ref(false);

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