<!-- 对 el-date-picker 包装, 实现格式化默认值 -->
<template>
  <el-date-picker v-model="thisValue" :type="type" :placeholder="placeholder" :format="format.show"
    :date-format="format.date" :time-format="format.time" :value-format="format.value" @change="change" />
</template>
<script setup lang="ts">
import type { EpPropMergeType } from 'element-plus/es/utils';
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { DefaultConfig } from '../../DefaultConfig';
import { defaultValue } from '../../util/DefaultValue';
import moment from 'moment';

const props = defineProps<{
  type: 'date' | 'datetime',
  modelValue?: string | number | undefined | null,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  placeholder?: string,
  valueFormat?: string,
  showFormat?: string,
  showDateFormat?: string,
  showTimeFormat?: string
}>()

const thisValue = ref<string | undefined>('');

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'change', value: string): void,
}>()

function change(value: string) {
  emits('update:modelValue', value);
  emits('change', value);
}

// 上层 modelValue 改变, 改变本级 value
watch(() => props.modelValue, (newValue) => {
  thisValue.value = newValue ? moment(newValue, format.value.value).format('YYYY-MM-DD HH:mm:ss') : undefined;
})

const format = computed(() => {
  switch (props.type) {
    case 'date':
      return {
        show: defaultValue(props.showFormat, DefaultConfig.other.date.showFormat),
        value: defaultValue(props.valueFormat, DefaultConfig.other.date.valueFormat),
      }
    case 'datetime':
    default:
      return {
        show: defaultValue(props.showFormat, DefaultConfig.other.datetime.showFormat),
        value: defaultValue(props.valueFormat, DefaultConfig.other.datetime.valueFormat),
        date: defaultValue(props.showDateFormat, DefaultConfig.other.datetime.showDateFormat),
        time: defaultValue(props.showTimeFormat, DefaultConfig.other.datetime.showTimeFormat),
      };
  }
})
</script>