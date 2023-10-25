<template>
  <el-date-picker v-model="value1" :type="type" :placeholder="placeholder" :format="format.show"
    :date-format="format.date" :time-format="format.time" :value-format="format.value" @change="change" />
</template>
<script setup lang="ts">
import type { EpPropMergeType } from 'element-plus/es/utils';
import { defineProps, defineEmits, withDefaults, ref, computed } from 'vue';
import { DefaultConfig } from '../DefaultConfig';
import { defaultValue } from '../util/DefaultValue';

const props = withDefaults(defineProps<{
  type: 'date' | 'datetime',
  modelValue?: string | number | undefined | null,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  placeholder?: string,
  valueFormat?: string,
  showFormat?: string,
  showDateFormat?: string,
  showTimeFormat?: string
}>(), {

});

const value1 = ref<string | undefined>('');

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()


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

function change(value: string) {
  emits('update:modelValue', value);
}
</script>