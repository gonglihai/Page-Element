<!-- 对 el-radio 包装, 支持 设置静态 options, 与动态从 api 获取 选项 -->
<template>
  <template v-if="error.error">
    <span>数据获取失败 <el-button :icon="Refresh" @click="reload()" link size="small"></el-button></span>
  </template>
  <template v-else>
    <el-radio-group :model-value="modelValue" @change="(value) => emits('update:modelValue', value)">
      <el-radio v-for="option in thisOptions" :key="option[valueMapping]" :label="option[valueMapping]"
        :disabled="option.disabled" :size="size" :border="border">
        {{ option[nameMapping] }}
      </el-radio>
    </el-radio-group>
  </template>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue';
import { useApi } from './useApi';
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types';
import { Refresh } from '@element-plus/icons-vue'
const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean | undefined,
  options?: ApiRadioOption[],
  api?: string | undefined | null,
  valueMapping?: string,
  nameMapping?: string,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  border?: boolean,
}>(), {
  valueMapping: 'id',
  nameMapping: 'name'
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>();

const { error, reload, thisOptions } = useApi(props.api, null, props.options);

interface ApiRadioOption {
  disabled?: boolean | number,
  name?: string | number | boolean,
  id: string | number | boolean,
}
</script>