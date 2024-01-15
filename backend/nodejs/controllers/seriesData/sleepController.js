const sleepDataModel = require('../../models/sleepData')
const sleepSeriesDataModel = require('../../models/sleepSeriesData')
const { saveScoreSleep } = require('./scoreController')

async function updateSleep(userId, sleepDurMinute){
  var sleepData = await sleepDataModel.findOne({userId: userId})
  if (sleepData == null) {
    return Promise.reject(403)
  }
  const sleepSeriesData = new sleepSeriesDataModel({
    tableRef: sleepData._id,
    sleepDuration: sleepDurMinute
  })
  return sleepSeriesData.save().then(() => {
    return sleepData.save()
  }).then(() => {
    return saveScoreSleep(userId, sleepDurMinute)
  }).catch(() => {return Promise.reject(500)})
}

async function getSleepData(userId) {
  const sData = await sleepDataModel.findOne({userId: userId})
  const sSeriesData = await sleepSeriesDataModel.find({
    sleepDataSetRef: sData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ sleepDuration: 1, timestamp: 1})
  .exec()
  return sSeriesData 
}

module.exports = {updateSleep, getSleepData}