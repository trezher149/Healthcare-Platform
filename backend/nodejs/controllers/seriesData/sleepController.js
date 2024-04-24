const sleepDataModel = require('../../models/sleepData')
const sleepSeriesDataModel = require('../../models/sleepSeriesData')
const { saveScoreSleep } = require('./scoreController')

async function updateSleep(userId, sleepDurMinute){
  var sleepData = await sleepDataModel.findOne({userId: userId})
  var sleepCond = false
  const today = new Date()
  console.log(today.getDate())
  if (sleepData == null) {
    return Promise.reject(403)
  }
  const tableRef = sleepData._id
  const recentSleepData = await sleepSeriesDataModel.findOne({tableRef: tableRef}).sort({timestamp : -1})
  if (recentSleepData) {
    if (today.getDate() == recentSleepData.timestamp.getDate()) { return Promise.reject(406) }
  }
  
  if (sleepDurMinute >= 420) {
    sleepCond = true
  }
  const sleepSeriesData = new sleepSeriesDataModel({
    tableRef: tableRef,
    sleepDuration: sleepDurMinute,
    sleepCond: sleepCond
  })
  console.log(sleepSeriesData)
  return sleepSeriesData.save().then(() => { return sleepData.save() })
  .then(async () => { return await saveScoreSleep(userId, sleepDurMinute) })
  .catch(() => {return Promise.reject(500)})
}

async function getSleepSeriesData(userId, lengthDays = 3) {
  const sleepData = await sleepDataModel.findOne({userId: userId})
  const sleepSeriesData = await sleepSeriesDataModel.find({
    tableRef: sleepData._id,
  }).limit(lengthDays).sort({timestamp: -1})
  .select({ sleepDuration: 1, sleepCond: 1, timestamp: 1}).lean()
  sleepSeriesData.forEach(item => {delete item._id})
  return sleepSeriesData
}

module.exports = {updateSleep, getSleepSeriesData}