<template>
  <div class="p-button-container">
    <el-button v-for="buttonItem in config" :key="buttonItem.event" :type="buttonItem.color" :icon="transformToIconComponent(buttonItem.icon)"
      @click="onClick(buttonItem, $event)">
      {{ buttonItem.name }}
    </el-button>
  </div>
</template>
<script setup lang="ts">
import type { ButtonItem } from './Types';
import { transformToIconComponent } from '../util/IconUtil';

const props = defineProps<{
  config: ButtonItem[]
}>();

const emit = defineEmits(['click'])

/**
 * 事件点击函数, 向上抛出
 * @param buttonItem 按钮配置
 * @param event 按钮点击事件
 */
function onClick(buttonItem: ButtonItem, event: Event) {
  emit('click', buttonItem, event);
}

</script>
<style scoped>
.p-button-container {
  margin: 0.5rem;
  margin-bottom: 0;
}
</style>