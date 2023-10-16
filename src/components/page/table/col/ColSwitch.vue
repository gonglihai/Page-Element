<!-- 开关列 -->
<template>
  <el-table-column sortable :prop="col.field" :width="defaultValue(col.width, 70)" :align="defaultValue(col.align, 'center')" :label="col.name">
    <template #default="scope">
      <el-switch v-model="scope.row[col.field]" :loading="loadding" :before-change="beforeChange" @click.stop/>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { ColSwitch } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { post } from '../../util/Api';
import { ref } from 'vue';



const props = defineProps<{
  col: ColSwitch
}>();

const loadding = ref(false);

function beforeChange() {
  loadding.value = true;
  return new Promise<boolean>((success, fail) => {
    if (!props.col.api) {
      loadding.value = false;
      success(true);
      return;
    }

    // api post 请求
    post(props.col.api, {
      id: props.col.idField
    }).then(() => success(true))
      .catch(() => fail(false))
      .finally(() => {
        loadding.value = false;
      })
  })

}

</script>