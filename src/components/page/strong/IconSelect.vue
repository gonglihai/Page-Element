<template>
  <el-select :size="size" :popper-class="'icon-select'" :model-value="modelValue" @change="change" clearable filterable>
    <el-option-group v-for="iconType in elementIconTypes" :key="iconType.type" :label="iconType.type">
      <el-option v-for="iconKey in iconType.icons" :key="iconKey" :label="iconKey" :value="iconKey">
        <div class="icon-content" :title="iconKey">
          <el-icon>
            <component :is="getIconComponent(iconKey)" />
          </el-icon>
        </div>
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
import { defineProps, defineEmits, type Component, watch, shallowRef } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { elementIconTypes } from './IconSelectData';
import type { EpPropMergeType } from 'element-plus/es/utils';

const props = defineProps<{
  modelValue?: string | undefined,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

function change(value: string | null) {
  emits('update:modelValue', value);
}

const currentSelectComponent = shallowRef<Component | null>(null);

/**
 * 通过图标名称, 获取图标
 * @param iconName 图标名称
 * @returns Component | null
 */
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

.icon-select .icon-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.icon-select .el-select-group .el-select-dropdown__item {
  padding: 0;
  width: 20%;
  border-radius: 5px;
  height: 45px;
}
</style>