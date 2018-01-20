import db from '../sql'
import {NumberToChinese, ChineseToNumber} from '../utils/numberToChinese'
const sequelize = db.sequelize
const Sequelize = db.Sequelize

// 书明细
const bookdetail = sequelize.define('bookdetail', {
  // 记录流水号 主键 自增列
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  // 书名
  bookName: {type: Sequelize.STRING, allowNull: false},
  // 作者
  author: {type: Sequelize.STRING, allowNull: false},
  // 来源
  source: {type: Sequelize.STRING, allowNull: false},
  // 章节名
  chapterName: {type: Sequelize.STRING, allowNull: false},
  // 章节数
  chapter: {type: Sequelize.INTEGER, allowNull: false},
  // 单张字数
  wordCount: {type: Sequelize.STRING, allowNull: false}
}, {
  timestamps: false,
  getterMethods: {
    _chapter () {
      return '第' + NumberToChinese(this.chapter) + '章'
    }
  },

  setterMethods: {
    _chapter (value) {
      this.setDataValue('chapter', ChineseToNumber(value))
    }
  }
})
// node require
module.exports = bookdetail
// es6 import
export default bookdetail
