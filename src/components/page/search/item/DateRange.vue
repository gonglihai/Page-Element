<template>
  <!-- 日期范围 date-range -->
  <el-date-picker v-if="searchItem.type == 'date-range'" class="search-date-range" style="width: 12.75rem"
    v-model="modelValue" type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts"
    @change="onChange" value-format="YYYY-MM-DD HH:mm:ss" />

  <!-- 时间范围 time-range -->
  <el-time-picker v-else-if="searchItem.type == 'time-range'" class="search-time-range" style="width: 12.75rem"
    v-model="modelValue" is-range start-placeholder="开始时间" end-placeholder="结束时间" @change="onChange"
    value-format="HH:mm:ss" />
  <!-- 日期时间范围 -->
  <el-date-picker v-else-if="searchItem.type == 'datetime-range'" v-model="modelValue" @change="onChange"
    class="search-date-range" style="width: 12.75rem" type="datetimerange" :shortcuts="shortcuts" start-placeholder="开始时间"
    end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { SearchItem } from '../Types';

const props = defineProps<{
  searchItem: SearchItem & { field: string[] },
  formData: any
}>()

// 下拉框绑定值
const modelValue = ref('')

// 快捷选择
const shortcuts = [
  {
    text: '一周前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '一个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '三个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
  {
    text: '六个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      return [start, end]
    },
  },
]

/**
 * 日期下拉框数据改变监听
 * @param value 改变后的值
 */
function onChange(value: any) {
  let fieldName = ['startTime', 'endTime'];
  // 自定义 fieldName
  if (props.searchItem.field && props.searchItem.field.length == 2) {
    fieldName = props.searchItem.field;
  }

  // 清空时 value 值为 null, 判断
  let setValue = [undefined, undefined] as unknown[];
  if (value && value.length == 2) {
    setValue = value;
  }
  props.formData[fieldName[0]] = setValue[0];
  props.formData[fieldName[1]] = setValue[1];
}

/**
 * 父级调用重置事件
 * @param options 
 */
setDefaultValue();
function setDefaultValue() {
  let v: string | string[] = '';
  // 函数
  if (typeof props.searchItem.default == 'function') {
    v = props.searchItem.default(null);
  }
  // 固定值
  if (props.searchItem.default && props.searchItem.default.length == 2) {
    v = props.searchItem.default;
  }
  modelValue.value = v as string;
  onChange(v)
}

defineExpose({
  setDefaultValue
})
</script>
<style>
/* 隐藏左边的图标, 节省空间 */
.search-date-range.el-date-editor i.el-icon:first-child {
  display: none;
}

/* 隐藏左边的图标, 节省空间 */
.search-time-range.el-date-editor i.el-icon:first-child {
  display: none;
}
</style>