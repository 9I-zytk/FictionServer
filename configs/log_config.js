const path = require('path')

// 错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, '../logs/error')

// 响应日志输出完整路径
const responseLogPath = path.resolve(__dirname, '../logs/response')

// const config = {
//   'appenders': [
//     // 错误日志
//     {
//       // logger名称
//       'category': 'errorLogger',
//       // 日志类型
//       'type': 'dateFile',
//       // 日志输出位置
//       'filename': errorLogPath,
//       // 是否总是有后缀名
//       'alwaysIncludePattern': true,
//       // 后缀，
//       'pattern': '-yyyy-MM-dd.log'
//     },
//     // 响应日志
//     {
//       'category': 'resLogger',
//       'type': 'dateFile',
//       'filename': responseLogPath,
//       'alwaysIncludePattern': true,
//       'pattern': '-yyyy-MM-dd.log'
//     }
//   ],
//   // 设置logger名称对应的的日志等级
//   'levels':
//       {
//         'errorLogger': 'ERROR',
//         'resLogger': 'ALL'
//       }
// }

const logConfig = {
  appenders: {
    errorLogger: {
      // 日志类型
      'type': 'dateFile',
      // 日志输出位置
      'filename': errorLogPath,
      // 是否总是有后缀名
      'alwaysIncludePattern': true,
      // 后缀
      'pattern': '-yyyy-MM-dd.log'
    },
    resLogger: {
      // 日志类型
      'type': 'dateFile',
      // 日志输出位置
      'filename': responseLogPath,
      // 是否总是有后缀名
      'alwaysIncludePattern': true,
      // 后缀
      'pattern': '-yyyy-MM-dd.log'
    }
  },
  categories: {
    default: {
      appenders: ['errorLogger'],
      level: 'error'
    }
  }
}
module.exports = logConfig
export default logConfig
