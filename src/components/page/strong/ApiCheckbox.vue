<!-- 对 el-checkbox 包装, 支持 设置静态 options, 与动态从 api 获取 选项 -->
<template>
  <template v-if="error.error">
    <span>数据获取失败 <el-button :icon="Refresh" @click="reload()" link size="small"></el-button></span>
  </template>
  <template v-else>
    <el-checkbox-group :model-value="thisValue" @change="change">
      <el-checkbox v-for="option in thisOptions" :key="option[valueMapping]" :label="option[valueMapping]"
        :disabled="option.disabled" :size="size" :border="border">
        {{ option[nameMapping] }}
      </el-checkbox>
    </el-checkbox-group>
  </template>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue';
import { useApi } from './useApi';
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types';
import { Refresh } from '@element-plus/icons-vue'
import { toArray, toValue } from '../util/ArrayUtil'


interface ApiCheckboxOption {
  disabled?: boolean | number,
  name?: string | number | boolean,
  id: string | number | boolean,
}

const props = withDefaults(defineProps<{
  modelValue?: [] | string | undefined,
  options?: ApiCheckboxOption[],
  api?: string | undefined | null,
  valueMapping?: string,
  nameMapping?: string,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  border?: boolean,
  valueType?: 'string' | 'array'
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
  return toArray(props.modelValue, props.valueType);
})

function change(value: any) {
  value = toValue(value, props.valueType);
  emits('update:modelValue', value)
  emits('change', value)
}
</script>