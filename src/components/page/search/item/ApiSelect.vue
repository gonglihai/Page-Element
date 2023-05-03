<template>
  <el-select style="width: 100%" v-model="formData[searchItem.field]" :placeholder="'请选择' + searchItem.name" clearable
    filterable no-match-text="没有匹配" no-data-text="无数据" :multiple="searchItem.multiple" :loading="loading"
    loading-text="正在加载">
    <el-option v-for="option in options" :label="getOptionLable(option)" :value="getOptionValue(option)" />
  </el-select>
</template>
<script setup lang="ts">
import { nextTick, ref } from 'vue';
import type { SearchItem } from '../Types';
import { get } from "../../util/Api";

// 下拉框选项
const options = ref([] as { id: string, name: string }[]);
// 下拉框加载状态
const loading = ref(false);

const props = defineProps<{
  searchItem: SearchItem & { options: [], api: string, multiple: boolean },
  formData: any
}>()
/** 
 * 获取下拉框选项显示的 label
 * 默认取 name 字段
 * @param option 选项数据
 */
function getOptionLable(option: any): string {
  return option.name ? option.name : option;
}
/** 
 * 获取下拉框选项的 value
 * 默认取 id 字段
 * @param option 选项数据
 */
function getOptionValue(option: any): string {
  return option.id ? option.id : option;
}


/**
 * 设置下拉框选项
 */
setOptions();
function setOptions() {
  // 优先从 api 中获取
  if (props.searchItem.api) {
    loading.value = true;
    get(props.searchItem.api).then(r => {
      options.value = r.data;
      loading.value = false;
      setCheckValue(r.data)
    })
    return;
  }

  // api 获取不到, 从 配置的静态中获取
  if (props.searchItem.options) {
    options.value = props.searchItem.options
    setCheckValue(props.searchItem.options);
  }
}

/**
 * 获取并设置表单数据中 searchItem.field 对 key 的值
 * @param optionsData 下拉框选项数据
 */
function setCheckValue(optionsData: any[]) {
  // 函数
  if (typeof props.searchItem.default == 'function') {
    props.formData[props.searchItem.field] = props.searchItem.default(optionsData);
    return;
  }
  // 定值
  if (props.searchItem.default) {
    props.formData[props.searchItem.field] = props.searchItem.default;
    return;
  }
  // null, undefined, 0, ''
  props.formData[props.searchItem.field] = null;
}

/**
 * 父级调用重置事件
 * @param options 
 */
function setDefaultValue() {
  nextTick(() => {
    setCheckValue(options.value);
  })
}

defineExpose({
  setDefaultValue
})
</script>