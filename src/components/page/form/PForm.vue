<template>
  <el-dialog v-model="dialogVisible" title="表单">
    <el-form :model="form" label-width="120px">
      <el-form-item v-for="formItem in form.item" :key="formItem.field" :label="formItem.name" :prop="formItem.field">
        <component v-if="formItem.field" :is="formItemType(formItem)" v-bind="formItem"
          v-model="formData[formItem.field]"></component>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >
          提交
        </el-button>
        <el-button >重置</el-button>
      </el-form-item>
    </el-form>
    {{ formData }}
  </el-dialog>
</template>
<script setup lang="ts">
import type { Form } from './Types';
import { ref, defineProps } from 'vue';
import { formItemType } from "./item/Index";
const dialogVisible = ref(true);

const props = defineProps<{
  form: Form
}>();

const formData = ref<{
  [key: string]: any
}>({});

</script>