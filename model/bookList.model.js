import db from '../sql'
import bookType from './bookType.model'

const sequelize = db.sequelize
const Sequelize = db.Sequelize
// 书籍列表
const bookList = sequelize.define('bookList', {
  // 书 主键 自增列
  id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
  // 书名 唯一约束
  name: {type: Sequelize.STRING, unique: true, allowNull: false},
  // 最后更新时间 设置默认时间为当前时间
  updateTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  // 书名连接
  url: {type: Sequelize.STRING, validate: {isUrl: true}, allowNull: false},
  // 来源
  source: {type: Sequelize.STRING, allowNull: false},
  // 预览图
  images: {type: Sequelize.STRING, validate: {isUrl: true}, allowNull: false},
  // 类型
  bookType: {
    type: Sequelize.INTEGER,
    references: {
      model: bookType,
      key: 'typeId'
    }
  },
  // 标签
  tags: {type: Sequelize.STRING},
  // 作者
  author: {type: Sequelize.STRING, allowNull: false},
  // 简介
  intro: {type: Sequelize.STRING, allowNull: false},
  // 总字数 单位万
  wordCount: {type: Sequelize.STRING, allowNull: false},
  // 最后更新章节
  chapter: {type: Sequelize.INTEGER, allowNull: false}
}, {
  timestamps: false
})
// node require
module.exports = bookList
// es6 import
export default bookList
