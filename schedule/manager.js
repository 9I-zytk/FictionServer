import schedule from 'node-schedule'
const _schedule = { 
  schedule: new Map()
}
_schedule.addSchedule = function (name,opt) {
  const rule = new schedule.RecurrenceRule() 
  const scheduleEvent = schedule.scheduleJob(rule, function(){
    delLog(config.dir.log)
    console.log('The answer to life, the universe, and everything!')
  });
  _schedule.schedule.set(name,scheduleEvent)
}
_schedule.cancleSchedule = function(name) {
  if(_schedule.schedule.has(name)) {
  const scheduleEvent = _schedule.schedule.get(name)
  scheduleEvent.cancle && scheduleEvent.cancle()
  _schedule.schedule.delete(name)
  }
}
export default schedule
module.exports = schedule