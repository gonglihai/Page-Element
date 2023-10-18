<!-- 对 el-switch 包装, 支持 api 请求 -->
<template>
  <el-switch :model-value="modelValue" :loading="loadding" :before-change="beforeChange" @click.stop />
</template>
<script setup lang="ts">
import { post } from '../util/Api';
import { defaultValue } from "../util/DefaultValue";
import { ref, defineEmits } from 'vue';
import { DefaultConfig } from '../DefaultConfig';

const props = defineProps<{
  api?: string | undefined,
  modelValue?: boolean,
  id?: string,
  idField?: string
}>();

const loadding = ref(false);

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function beforeChange() {
  loadding.value = true;
  return new Promise<boolean>((success, fail) => {
    const changeValue = !props.modelValue;

    if (!props.api) {
      loadding.value = false;
      success(true);
      emits('update:modelValue', changeValue);
      return;
    }

    const idField = defaultValue(props.idField, DefaultConfig.other.id.idFieldName) as string;
    // api post 请求
    post(props.api, {
      [idField]: props.id,
      value: changeValue
    }).then(() => {
      success(true);
      emits('update:modelValue', changeValue);
    })
      .catch(() => fail(false))
      .finally(() => {
        loadding.value = false;
      })
  })
}
</script>