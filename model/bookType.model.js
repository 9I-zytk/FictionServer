import db  from '../sql'
const sequelize = db.sequelize
const Sequelize = db.Sequelize
// 书类型
const bookType = sequelize.define('bookType', {
  // 类型id 主键 自增列
  typeId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  // 类型名 唯一约束
  typeName: {type: Sequelize.STRING, unique: true, allowNull: false},
  // 来源
  source: {type: Sequelize.STRING, allowNull: false}
}, {
  timestamps: false
})
// node require
module.exports = bookType
// es6 import
export default bookType
