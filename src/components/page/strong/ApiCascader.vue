<!-- 对 el-cascader 包装, 支持 设置静态 options, 与动态从 api 获取 选项 -->
<template>
  <template v-if="error.error">
    <span>数据获取失败 <el-button :icon="Refresh" @click="reload()" link size="small"></el-button></span>
  </template>
  <template v-else>
    <el-cascader :model-value="thisValue" @change="change" :placeholder="placeholder" :size="size" clearable filterable
      :multiple="multiple" :options="thisOptions" :props="{
        value: valueMapping,
        label: nameMapping,
        multiple: multiple,
        expandTrigger: expandTrigger,
        checkStrictly: checkStrictly,
        emitPath: emitPath
      }">
    </el-cascader>
  </template>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue';
import { useApi } from './useApi';
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types';
import { Refresh } from '@element-plus/icons-vue'
import { toArray } from '../util/ArrayUtil'
import { DefaultConfig } from '../DefaultConfig';
import { defaultValue } from '../util/DefaultValue';


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
  valueType?: 'string' | 'array', // 多选值类型

  // CascaderProps, 见: https://element-plus.gitee.io/zh-CN/component/cascader.html#cascaderprops
  expandTrigger?: 'click' | 'hover', // 次级菜单的展开方式, "click" 单击, "hover" 徘徊
  multiple?: boolean, // 多选
  checkStrictly?: boolean, // 是否严格的遵守父子节点不互相关联, 多选情况下, 不关联后, 需要设置 emitPath 为 false
  emitPath?: boolean, // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值	

}>(), {
  valueMapping: 'id',
  nameMapping: 'name',
  expandTrigger: 'click',
  emitPath: true
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>();

const { error, reload, thisOptions } = useApi(props.api, null, props.options);


const thisValue = computed(() => {
  const value = toArray(props.modelValue, props.valueType);
  // 取选项第一个值, 如果是数字, 变成 number[], 否则返回默认的 string[]
  if (thisOptions.value && thisOptions.value.length && thisOptions.value[0] && thisOptions.value[0][props.valueMapping]) {
    if (typeof thisOptions.value[0][props.valueMapping] == 'number') {
      return value.map(item => new Number(item));
    }
  }
  return value;
})

function change(value: any) {
  const valueType = defaultValue(props.valueType, DefaultConfig.other.array.type);
  if (!value) {
    emits('update:modelValue', valueType == 'string' ? '' : [])
    return;
  }
  // 多选, 是个二维数组, 去除相同父级内容
  const valueSet = new Set();
  value.forEach((item: unknown) => {
    if (item instanceof Array) {
      item.forEach(item2 => {
        valueSet.add(item2);
      })
    } else {
      valueSet.add(item);
    }
  })
  const r = valueType == 'string' ? [...valueSet].join(DefaultConfig.other.array.delimiter) : [...valueSet];
  emits('update:modelValue', r)
}
</script>