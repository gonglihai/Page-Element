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
          return options[0].id;
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
        return ["00:00:00", "12:00:00"];
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
    { name: '自定义', event: 'custom' }
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
      { type: 'selection', fixed: 'left' },
      { type: 'index' },
      { field: 'id', name: 'ID' },
      { field: 'name', name: '姓名', fixed: 'left' },
      {
        type: 'tag', field: 'status', name: '状态', tag: [
          { color: 'success', name: '状态1' },
          { color: 'info', name: '状态2' },
          { color: 'warning', name: '状态3' },
          { color: 'danger', name: '状态4' },
          { name: '状态5' }
        ]
      },
      { type: 'friend-time', field: 'cdate', name: '创建时间' },
      {
        type: 'button', button: [
          { icon: 'Edit', name: '编辑', event: 'inner-edit', color: "danger" },
          { icon: 'Delete', name: '删除', event: 'inner-delete', color: "warning" },
          { icon: 'Operation', name: '自定义', event: 'custom', color: "success" }
        ], fixed: 'right', width: 250
      },
      { type: 'img', field: 'avatar', name: '图片', width: 100, height: 100 },
      { type: 'imgs', field: 'avatars', name: '图片(多)' },
      { type: 'switch', field: 'switch', name: '开关', api: 'api/ApiSelect.json' },
      {
        name: '多级表头1', children: [
          { field: 'children1', name: '多级1-1' },
          {
            name: '多级表头1-2', children: [
              { field: 'switch', name: '多级1-2-1', type: 'switch' },
              { field: 'children2', name: '多级1-2-2' },
              {
                name: '多级表头1-2-3', children: [
                  { field: 'children1', name: '多级1-2-3-1' },
                  {
                    field: 'children2', name: '多级1-2-3-2', children: [{
                      name: '多级表头1-2', children: [
                        { field: 'switch', name: '多级1-2-1', type: 'switch' },
                        { field: 'children2', name: '多级1-2-2' },
                        {
                          name: '多级表头1-2-3', children: [
                            { field: 'children1', name: '多级1-2-3-1' },
                            { field: 'children2', name: '多级1-2-3-2' },
                          ]
                        }
                      ]
                    },]
                  },
                ]
              }
            ]
          },
          { field: 'children2', name: '多级2', show: true },
        ]
      },
    ]
  },
  form: {
    item: [
      { field: 'id', name: 'ID' },
      { field: 'name', name: '姓名' },
      {
        field: 'radio1', type: 'radio', name: '单选, options', options: [
          { id: '1', name: '选项1' },
          { id: '2', name: '选项2' },
          { id: '3', name: '选项3' }
        ]
      },
      { field: 'radio2', type: 'radio', name: '单选, api', api: 'api/ApiSelect.json' },
      {
        field: 'checkbox1', type: 'checkbox', name: '复选框, options', options: [
          { id: '1', name: '选项1' },
          { id: '2', name: '选项2' },
          { id: '3', name: '选项3' }
        ]
      },
      { field: 'checkbox2', type: 'checkbox', name: '复选框, options', api: 'api/ApiSelect.json' },
      {
        field: 'select1', type: 'select', name: '下拉框, options', options: [
          { id: '1', name: '选项1' },
          { id: '2', name: '选项2' },
          { id: '3', name: '选项3' }
        ], multiple: true
      },
      { field: 'select2', type: 'select', name: '下拉框, api', api: 'api/ApiSelect.json' },
      {
        field: 'cascader1', type: 'cascader', name: '级联下拉框, options', options: [
          {
            "id": "1", "name": "1", children: [
              { "id": "12", "name": "1-2", },
              {
                "id": "13", "name": "1-3", children: [
                  { "id": "131", "name": "1-3-1", },
                  { "id": "132", "name": "1-3-2", },
                  { "id": "133", "name": "1-3-3", },
                ]
              },
              { "id": "14", "name": "1-4", },
            ]
          },
          { "id": "2", "name": "2", },
          { "id": "3", "name": "3", },
          { "id": "4", "name": "4", },
        ], expandTrigger: 'hover',
        // 多选, 不选择父级, 需要 emitPath 为 false
        multiple: true, checkStrictly: true, emitPath: false
      },
      { field: 'cascader2', type: 'cascader', name: '级联下拉框, api', api: 'api/cascader.json', valueMapping: 'code' },
      { type: 'date', field: 'date', name: '日期(年月日)' },
      { type: 'datetime', field: 'datetime', name: '日期时间(年月日时分秒)'},
      { type: 'time', field: 'time', name: '时间' },
    ]
  }
} as Config)


function buttonClick(param: ButtonClickHandleParam) {
  Log.info('PageTest', param);
}
</script>
