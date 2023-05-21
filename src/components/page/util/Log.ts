export const Log = {
  debug(...args: any[]) {
    console.log(...logPrefix('debug'), ...args);
  },
  info(...args: any[]) {
    console.log(...logPrefix('info'), ...args);
  },
  warn(...args: any[]) {
    console.log(...logPrefix('warn'), ...args);
  },
  error(...args: any[]) {
    console.log(...logPrefix('error'), ...args);
  },
}

// 日志级别及样式配置
const Level = {
  debug: ['%cdebug', 'background:#aaa; color:#fff; border-radius: 3px; padding:0 4px'],
  info: ['%cinfo', 'background:#909399; color:#fff; border-radius: 3px; padding:0 4px'],
  warn: ['%cwarn', 'background:#e6a23c; color:#fff; border-radius: 3px; padding:0 4px'],
  error: ['%cerror', 'background:#f56c6c; color:#fff; border-radius: 3px; padding:0 4px'],
};

const prefix = ['%cPage', 'background:#409eff; color: #fff; border-radius: 3px; padding:0 4px; margin-right: 4px'];

/**
 * 日期前缀
 * @param name 级别名称
 * @returns []
 */
function logPrefix(name: keyof typeof Level) {
  return [
    prefix[0] + Level[name][0], //示例(info级别): "%cPage %cinfo"
    prefix[1],                  // 前缀样式
    Level[name][1],             // 级别样式
    // getStack(4)                 // 调用堆
  ];
}

/**
 * 获取调用堆信息
 * @param callStack 调用堆层级数
 * @returns 返回示例: "sizeChange (http://127.0.0.1:5173/src/components/page/table/Table.vue?t=1684042076338:24:11):"
 */
function getStack(callStack: number) {
  const stackStr = new Error().stack;
  if (!stackStr) {
    return '无法获取到调用堆';
  }
  // 示例: at sizeChange (http://127.0.0.1:5173/src/components/page/table/Table.vue?t=1684041205549:24:11)
  const stackLine = stackStr.split("\n")[callStack].trim().substring(3);
  return `${stackLine}:`;
}