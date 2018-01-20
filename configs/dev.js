module.exports = {
  env: 'development',
  debug: true,
  mysqlConfig: { // 数据库配置
    url: 'mysql: //localhost:3306/fiction-dev',
    host: 'localhost',
    dialect: 'mysql',
    database: 'fiction-dev',
    port: '3306',
    opts: {
      user: 'root',
      pass: ''
    }
  }
}
