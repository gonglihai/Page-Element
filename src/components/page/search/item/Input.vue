<template>
  <el-input v-model="formData[searchItem.field]" :placeholder="'请输入' + searchItem.name" clearable />
</template>
<script setup lang="ts">
import type { SearchItem } from '../Types';
import { nextTick } from 'vue';

const props = defineProps<{
  searchItem: SearchItem,
  formData: any
}>()

// 初始化字段
setDefaultValue()

/**
 * 父级调用重置事件
 */
function setDefaultValue() {
  nextTick(() => {
    if (typeof props.searchItem.default === 'function') {
      props.formData[props.searchItem.field] = props.searchItem.default(undefined);
      return;
    }
    props.formData[props.searchItem.field] = props.searchItem.default
  })
}

defineExpose({
  setDefaultValue
})
</script>