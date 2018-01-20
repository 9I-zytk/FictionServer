const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot, '../'),
  staticDir = path.join(root, 'static'),
  dev = require('./dev.js'),
  fs = require('fs'),
  _ = require('lodash')
// 默认生产环境
let config = {
  app: {
    name: 'fiction',
    port: 6001,
    apiPath: '/api' // 后台路径
  },
  debug: false,
  env: 'production',
  mysqlConfig: { // 数据库配置
    url: 'mysql: //localhost:3306/fiction',
    host: 'localhost',
    dialect: 'mysql',
    database: 'fiction',
    port: '3306',
    opts: {
      user: 'root',
      pass: ''
    }
  },
  dir: { // 目录配置
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource')
  },
  jwt: {
    cert: 'fiction'
  }
}
// 本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}
// 生产环境配置
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(path.join(__dirname, '/production.js'))) {
    config = _.merge(config, require('./production.js'))
  }
}

module.exports = config
