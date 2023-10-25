<template>
  <el-select :size="size" :popper-class="'icon-select'" :model-value="modelValue" @change="change" clearable filterable>
    <el-option-group v-for="iconType in elementIconTypes" :key="iconType.type" :label="iconType.type">
      <el-option v-for="iconKey in iconType.icons" :key="iconKey" :label="iconKey" :value="iconKey">
        <div class="icon-content" :title="iconKey">
          <el-icon>
            <component :is="transformToIconComponent(iconKey)" />
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
import { defineProps, defineEmits, watch, shallowRef, type DefineComponent } from 'vue';
import { elementIconTypes } from './IconSelectData';
import type { EpPropMergeType } from 'element-plus/es/utils';
import { transformToIconComponent } from '../util/IconUtil';

const props = defineProps<{
  modelValue?: string | undefined,
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>,
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

function change(value: string | undefined) {
  emits('update:modelValue', value);
}

const currentSelectComponent = shallowRef<DefineComponent | undefined>(undefined);


watch(() => props.modelValue, (newValue) => {
  currentSelectComponent.value = transformToIconComponent(newValue);
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