<!-- 对 el-switch 包装, 支持 api 请求 -->
<template>
  <el-switch :model-value="modelValue" :size="size" :loading="loadding" :before-change="beforeChange" @click="click" />
</template>
<script setup lang="ts">
import { post } from '../util/Api';
import { defaultValue } from "../util/DefaultValue";
import { ref, defineEmits } from 'vue';
import { DefaultConfig } from '../DefaultConfig';
import { Log } from '../util/Log';
import type { EpPropMergeType } from 'element-plus/es/utils';

const props = defineProps<{
  api?: string | undefined,
  modelValue?: boolean,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
  id?: string,
  idField?: string
}>();

const loadding = ref(false);

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'change', value: boolean): void,
  (e: 'click', $event: Event): void
}>()

function changeValue(value: boolean) {
  emits('update:modelValue', value);
  emits('change', value);
}

function beforeChange() {
  loadding.value = true;
  return new Promise<boolean>((success, fail) => {
    const changeVal = !props.modelValue;

    if (!props.api) {
      loadding.value = false;
      success(true);
      changeValue(changeVal);
      return;
    }

    const idField = defaultValue(props.idField, DefaultConfig.other.id.idFieldName) as string;
    const requestParams = {
      [idField]: props.id,
      value: changeVal
    };
    Log.info('ApiSwitch', '切换状态 请求:', props.api, '参数:', requestParams);
    // api post 请求
    post(props.api, requestParams).then(() => {
      success(true);
      changeValue(changeVal);
    })
      .catch(() => fail(false))
      .finally(() => {
        loadding.value = false;
      })
  })
}

function click($event: Event) {
  emits('click', $event)
}
</script>