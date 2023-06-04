export const DefaultConfig = {
  // 数据表格
  table: {
    pageSizes: [20, 40, 100, 200], // 页大小下拉框选项值
    rowClickSelect: true,          // 行点击选中, (全局配置行点击选中 且 page 配置没有显示声明为 false) 或 (全局配置行点击不选中 且 page 配置行选中) 时, 点击行会选中
  },

  // 杂项
  other: {
    // 友好时间
    friendTime: {
      showMode: false,             // 格式化时间显示方式, true 鼠标 hover 显示具体时间, false 点击切换显示具体时间
      defaultShow: true,           // 默认显示方式, true 显示友好时间, false 显示 YYYY-MM-DD HH:mm:ss 时间
    },
    // id 相关
    id: {
      idsType: "array",            // id 集合呈现方式, "array" 数组, "string" 以 idsStringDelimiter 符号分隔的字符串
      idsStringDelimiter: ",",     // 当 idsType 为 "string" 时, 分隔符号
      idFieldName: "id"            // id 字段名
    }
  }
};