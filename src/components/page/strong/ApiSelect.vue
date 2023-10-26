<!-- 对 el-select 包装, 支持 设置静态 options, 与动态从 api 获取 选项 -->
<template>
  <template v-if="error.error">
    <span>数据获取失败 <el-button :icon="Refresh" @click="reload()" link size="small"></el-button></span>
  </template>
  <template v-else>
    <el-select :model-value="thisValue" @change="change" :placeholder="placeholder" :size="size" clearable filterable
      :multiple="multiple">
      <el-option v-for="option in thisOptions" :key="option[valueMapping]" :label="option.name" :value="option.id"
        :disabled="option.disabled" />
    </el-select>
  </template>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue';
import { useApi } from './useApi';
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types';
import { Refresh } from '@element-plus/icons-vue'
import { toArray, toValue } from '../util/ArrayUtil'
import { blankToNull } from '../util/StringUtil';


interface ApiSelectOption {
  disabled?: boolean | number,
  name?: string | number | boolean,
  id: string | number | boolean,
}

const props = withDefaults(defineProps<{
  modelValue?: [] | string | undefined,
  options?: ApiSelectOption[],
  api?: string | undefined | null,
  valueMapping?: string,
  nameMapping?: string,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  placeholder?: string,
  multiple?: boolean, // 多选
  valueType?: 'string' | 'array', // 多选值类型
}>(), {
  valueMapping: 'id',
  nameMapping: 'name'
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void,
  (e: 'change', value: any): void
}>();

const { error, reload, thisOptions } = useApi(props.api, null, props.options);

const thisValue = computed(() => {
  return props.multiple ? toArray(props.modelValue, props.valueType) : props.modelValue;
})

function changeValue(value: any) {
  emits('update:modelValue', value);
  emits('change', value);
}

function change(value: any) {
  changeValue(props.multiple ? toValue(value, props.valueType) : blankToNull(value));
}
</script>