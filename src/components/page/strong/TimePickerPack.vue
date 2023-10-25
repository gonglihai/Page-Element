<!-- 对 el-time-picker 包装, 支持 valueFormat -->
<template>
  <el-time-picker v-model="thisValue" :placeholder="placeholder" :size="size" @change="change" />
</template>
<script setup lang="ts">
import type { EpPropMergeType } from 'element-plus/es/utils';
import { defineProps, ref, withDefaults, watch } from 'vue';
import moment from 'moment';
import { DefaultConfig } from '../DefaultConfig';

const props = withDefaults(defineProps<{
  modelValue: string | undefined,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  placeholder?: string,
  valueFormat?: string
}>(), {
  valueFormat: DefaultConfig.other.time.valueFormat
})

const thisValue = ref<string | undefined>('');

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function change(value: any) {
  value = value ? moment(value).format(props.valueFormat) : value
  emits('update:modelValue', value);
}

watch(() => props.modelValue, (newValue) => {
  thisValue.value = newValue ? moment(newValue, props.valueFormat).format('YYYY-MM-DD HH:mm:ss') : undefined;
})
</script>