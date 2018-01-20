/**
 * Created by 9i
 * @Date 2017/12/21
 */
'use strict'
import db from '../sql'
import user from './user.model'

const sequelize = db.sequelize
const Sequelize = db.Sequelize

const userOpt = sequelize.define('userOpt', {
  // 用户Id 主键 自增列
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  // 用户名 唯一约束
  name: {
    type: Sequelize.STRING,
    references: {
      model: user,
      key: 'name'
    }
  },
  // 操作 设置默认时间为当前时间
  optTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  // 操作类型
  optType: {type: Sequelize.STRING}
}, {
  timestamps: false
})
// node require
module.exports = userOpt
// es6 import
export default userOpt
