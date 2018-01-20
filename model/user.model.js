import db from '../sql'

const sequelize = db.sequelize
const Sequelize = db.Sequelize
const levelArray = new Map([['0', '普通'], ['1', '管理员'], ['2', '超级管理员']])
// 用户表
const user = sequelize.define('user', {
  // 用户Id 主键 自增列
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  // 用户名 唯一约束
  name: {type: Sequelize.STRING, unique: true, allowNull: false},
  // 创建时间 设置默认时间为当前时间
  createdTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  // 是否启用 如果未赋值,则自动设置值为 TRUE
  valid: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
  // 密码
  passWord: {type: Sequelize.STRING, allowNull: false},
  // 邮箱
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}},
  // role
  role: {type: Sequelize.STRING},
  // 等级
  level: {type: Sequelize.ENUM, values: ['0', '1', '2']}
}, {
  timestamps: false,
  getterMethods: {
    _level () {
      return levelArray.get(this.level)
    }
  },
  setterMethods: {
    _level (value) {
      levelArray.forEach(function (v, key) {
        if (v === value) this.setDataValue('level', key)
      })
    }
  }
})
// node require
module.exports = user
// es6 import
export default user
