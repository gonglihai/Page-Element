<template>
  <div class="page-search-container">
    <div v-for="(searchItem, searchIndex) in config" class="page-search-item-container">
      <div class="page-search-label">
        {{ searchItem.name }}
      </div>
      <div class="page-search-field">
        <component :is="searchItemType(searchItem.type)" :searchItem="searchItem" :formData="formData"
          ref="componentRef" />
      </div>
    </div>
    <div class="page-search-button-container">
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="$emit('search', formData)">查询</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Component, nextTick } from "vue";
import type { SearchItem } from "./Types";
import { searchItemType } from './item/Index';

const props = defineProps<{
  config: SearchItem[]
}>();

const emit = defineEmits(['reset', 'search', 'init']);

/**
 * 创建表单对象字段
 */
const formData = ref({});

/**
 * 表单字段组件实例
 */
const componentRef = ref(null);

/**
 * 重置事件
 */
function reset() {
  // 通知表单项子组件重置事件
  if (componentRef.value) {
    (componentRef.value as Array<Component>).forEach(componentItem => {
      const setDefaultValue = (componentItem as Component & { setDefaultValue: Function | null }).setDefaultValue;
      if (setDefaultValue) {
        setDefaultValue();
      }
    })
  }
  nextTick(() => {
    // 通知上级重置
    emit('reset', formData.value);
  })
}

</script>
<style>
.page-search-container {
  display: flex;
  flex-wrap: wrap;
}

.page-search-item-container {
  width: 20rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}

.page-search-label {
  flex: auto;
  text-align: right;
  margin-right: 0.5rem;
  cursor: default;
  font-size: 14px;
}

.page-search-field {
  overflow: auto;
  width: 14rem;
}

.page-search-button-container {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 2rem;
}
</style>