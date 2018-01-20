module.exports = {
  mysqlConfig: { // 数据库配置
    url: 'mysql: //localhost:3306/fiction-production',
    host: 'localhost',
    dialect: 'mysql',
    database: 'fiction-production',
    port: '3306',
    opts: {
      user: 'root',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'fiction-product'
  }
}
