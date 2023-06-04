<template>
  <page :config="config" @buttonClick="buttonClick"></page>
  <el-link type="primary" href="https://element-plus.gitee.io/zh-CN/component/button.html" target="_blank">
    element-plus 文档
  </el-link>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Config } from '@/components/page/Config';
import Page from '../../components/page/Page.vue'
import type { ButtonClickHandleParam } from '@/components/page/button/Types';
import { Log } from '@/components/page/util/Log';

const config = ref({
  search: [
    {
      type: 'input',
      name: '输入框',
      field: 'sf1',
      default: '111'
    }, {
      type: 'select',
      name: '下拉框(单选)',
      field: 'sf2',
      api: 'api/ApiSelect.json',
      default(options: any[] | null | undefined) {
        // 从 api 中获取到的选项数据
        // 当 api 请求数据未完成时, 重置事件, 此时 options 为 null
        if (options && options.length) {
          return options[0].id
        }
        return null;
      }
    }, {
      type: 'select',
      name: '下拉框(多选)',
      field: 'sf3',
      api: 'api/ApiSelect.json',
      // options: [
      //   '111', '222', '333'
      // ],
      default: ['1'],
      multiple: true
    },
    {
      type: 'date-range',
      name: '日期范围',
      field: ['startTime', 'endTime'],
      default: ["2023-01-25 00:00:00", "2023-04-25 00:00:00"]
    },
    {
      type: 'time-range',
      name: '时间范围',
      field: ['timeRangeT1', 'timeRangeT2'],
      default() {
        return ["00:00:00", "12:00:00"]
      }
    },
    {
      type: 'datetime-range',
      name: '日期时间范围',
      field: ['datetimeRangeT3', 'datetimeRangeT4'],
      default: ["2023-01-25 12:00:00", "2023-04-25 00:00:00"]
    },
  ],
  button: [
    { icon: 'Plus', name: '添加', event: 'inner-add', color: "info" },
    { icon: 'Edit', name: '编辑', event: 'edit', color: "danger", selectCount: 1, minCount: 1, maxCount: 1, },
    { icon: 'Delete', name: '删除', event: 'inner-delete', color: "warning", api: 'api/delete.json' },
    { icon: 'Delete', name: '删除2', event: 'inner-delete', color: "warning", api: 'api/deleteFail.json' },
    {  name: '自定义', event: 'custom' }
  ],
  table: {
    api: 'api/DataTable.json',
    // data: [
    //   { id: '1', name: '张三', cdate: '2023-05-02 20:00:00' },
    //   { id: '1', name: '李四', cdate: null }
    // ],
    // pageSizes: [400],
    // rowClickSelect: false,
    col: [
      { type: 'selection' },
      { type: 'index' },
      { field: 'id', name: 'ID' },
      { field: 'name', name: '姓名' },
      { type: 'friend-time', field: 'cdate', name: '创建时间' },
      {
        type: 'button', button: [
          { icon: 'Edit', name: '编辑', event: 'inner-edit', color: "danger" },
          { icon: 'Delete', name: '删除', event: 'inner-delete', color: "warning" },
          { icon: 'Operation', name: '自定义', event: 'custom', color: "success" }
        ]
      },
    ]
  },

} as Config)


function buttonClick(param: ButtonClickHandleParam) {
  Log.info('PageTest', param);
}
</script>
