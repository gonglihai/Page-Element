<!-- 操作按钮列 -->
<template>
  <el-table-column :fixed="col.fixed" :width="col.width" :align="defaultValue(col.align, 'center')"
    :label="defaultValue(col.name, '操作')">
    <template #default>
      <el-button v-for="button in col.button" :key="button.event" size="small" :type="button.color"
        :icon="transformToIconComponent(button.icon)">
        {{ button.name }}
      </el-button>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { ButtonItem } from '../../button/Types';
import { defaultValue } from '../../util/DefaultValue';
import type { Col } from '../Types';
import { transformToIconComponent } from '../../util/IconUtil';

defineProps<{
  col: Col & { button: ButtonItem[] }
}>();

</script>
<style scoped>
.el-button+.el-button {
  margin-left: 8px;
}
</style>