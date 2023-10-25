<template>
  <el-select :popper-class="'icon-select'" :model-value="modelValue" @change="change" clearable filterable>
    <el-option-group v-for="iconType in elementIconTypes" :key="iconType.type" :label="iconType.type">
      <el-option v-for="iconKey in iconType.icons" :key="iconKey" :label="iconKey" :value="iconKey">
        <el-icon :title="iconKey">
          <component :is="getIconComponent(iconKey)" />
        </el-icon>
      </el-option>
    </el-option-group>
    <template v-slot:prefix>
      <el-icon style="color: var(--el-text-color-primary)">
        <component :is="currentSelectComponent" />
      </el-icon>
    </template>
  </el-select>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, type Component, watch, shallowRef } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { elementIconTypes } from './IconSelectData';

interface Option {
  value: string,
  component: Component
}

const props = withDefaults(defineProps<{
  modelValue?: string | undefined,
  options?: Option[]
}>(), {
  options: () => {
    return Object.entries(ElementPlusIconsVue).map((entity) => {
      return {
        value: entity[0],
        component: entity[1]
      }
    });
  }
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

function change(value: string | null) {
  emits('update:modelValue', value);
}

const currentSelectComponent = shallowRef<Component | null>(null);


function getIconComponent(iconName: string | null | undefined) {
  if (!iconName) {
    return null;
  }
  const find = Object.entries(ElementPlusIconsVue).find((entity) => entity[0] === iconName);
  return find ? find[1] : null;
}

watch(() => props.modelValue, (newValue) => {
  currentSelectComponent.value = getIconComponent(newValue);
})
</script>
<style>
.icon-select .el-select-group {
  display: flex;
  flex-wrap: wrap;
  width: 270px;
}

.icon-select .el-select-dropdown__item {
  padding: 0 20px;
  border-radius: 5px;
}
</style>