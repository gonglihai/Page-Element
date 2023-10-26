<template>
  <el-dialog v-model="dialogVisible" title="表单">
    <el-form ref="formRef" :model="formData" label-width="120px" :rules="rules">
      <el-form-item v-for="formItem in formItems" :key="formItem.formItem.field" :label="formItem.formItem.name"
        :prop="formItem.formItem.field">
        <template v-if="formItem.formItem.field">
          <component :is="formItem.component" v-bind="formItem.formItem" v-model="formData[formItem.formItem.field]" />
        </template>
        <template>
          <component :is="formItem.component" v-bind="formItem.formItem" />
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          提交
        </el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      formData:
      {{ formData }}
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import type { Form } from './Types';
import { ref, defineProps, computed } from 'vue';
import { formItemTypeComponent } from "./item/Index";
import type { FormItemRule, FormRules } from 'element-plus/es/components/form/src/types';
import type { FormInstance } from 'element-plus';
const dialogVisible = ref(true);

export interface FormData {
  [key: string]: any
}

const props = defineProps<{
  form: Form
}>();

const formData = ref<FormData>({});

const formRef = ref<FormInstance>()

const rules = computed(() => {
  if (!props.form.item || !props.form.item.length) {
    return undefined;
  }
  const r: FormRules = {};
  props.form.item.forEach(formItem => {
    if (!formItem.field) {
      return;
    }
    const formItemRules: FormItemRule[] = [];
    r[formItem.field] = formItemRules;
    if (formItem.required) {
      formItemRules.push({
        required: true,
        message: formItem.name + '不能为空',
        trigger: 'change'
      })
    }
  })
  return r;
})

const formItems = computed(() => {
  if (!props.form.item || !props.form.item.length) {
    return [];
  }
  return props.form.item.map(formItem => {
    return {
      component: formItemTypeComponent(formItem),
      formItem: formItem
    };
  })
})

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>