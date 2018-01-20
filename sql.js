const Sequelize = require('sequelize')
const config = require('./configs/default')

const sequelize = new Sequelize(config.mysqlConfig.database, 'root', '', {
  host: config.mysqlConfig.host,
  dialect: config.mysqlConfig.dialect,
  port: config.mysqlConfig.port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    // 同步所有尚未在数据库中的模型
    sequelize.sync().then(() => {
      // woot woot
      console.log('数据库模型同步成功')
    }).catch(err => {
      // whooops
      throw err
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:' + config.mysqlConfig.database, err)
  })
const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
export default db
