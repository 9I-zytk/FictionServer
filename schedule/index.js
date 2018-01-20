import schedule from 'node-schedule'
import delLog from '../utils/deleteLog'
import _schedule from './manager'
const config = require('../configs/default')
// 定时删除日志文件任务
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 0
rule.hour = 2
rule.minute = 0
// 每周日 2点删除
/* eslint-disable no-unused-vars */
const deleteLog = schedule.scheduleJob(rule, function () {
  delLog(config.dir.log)
  console.log('The answer to life, the universe, and everything!')
})

// 测试任务
const ruleTest = new schedule.RecurrenceRule()
ruleTest.second = 30
/* eslint-disable no-unused-vars */
const test = schedule.scheduleJob(ruleTest, function () {
  delLog(config.dir.log)
  console.log('schedule running')
})

module.exports = _schedule
export default _schedule
