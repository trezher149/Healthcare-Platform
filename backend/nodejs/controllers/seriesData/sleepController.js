const sleepDataModel = require('../../models/sleepData')
const sleepSeriesDataModel = require('../../models/sleepSeriesData')
const { saveScoreSleep } = require('./scoreController')

async function updateSleep(userId, sleptMinute){
  const USER_SLEEP_DATA = await sleepDataModel.findOne({userId: userId})
  if (USER_SLEEP_DATA == null) { return Promise.reject(403) }

  let sleepCondition = false //false: Sleep less than 7 hours. true: otherwise
  const RECOMMENDED_SLEEP_DURATION = 390
  const TODAY = () => {
    const TODAY_OBJ = new Date()
    return `${TODAY_OBJ.getFullYear()}-${TODAY_OBJ.getMonth()}-${TODAY_OBJ.getDate()}`
  }

  const TABLE_REF = USER_SLEEP_DATA._id

  const LATEST_SLEEP_DATA = await sleepSeriesDataModel.findOne({
    tableRef: TABLE_REF,
    timestamp: { $gte: TODAY() }
  })
  if (LATEST_SLEEP_DATA) { return Promise.reject(406) }

  if (sleptMinute >= RECOMMENDED_SLEEP_DURATION) {
    sleepCondition = true
  }
  const NEW_SLEEP_DATA = new sleepSeriesDataModel({
    tableRef: TABLE_REF,
    sleepDuration: sleptMinute,
    sleepCond: sleepCondition
  })

  await NEW_SLEEP_DATA.save()
  await USER_SLEEP_DATA.save()
  return saveScoreSleep(userId, sleptMinute)
  .then((result) => {return result}, () => {return Promise.reject(500)})
}

async function getSleepSeriesData(userId, lengthDays = 3) {
  const USER_SLEEP_DATA = await sleepDataModel.findOne({userId: userId})

  const SLEEP_DATA_ARR = await sleepSeriesDataModel.find({
    tableRef: USER_SLEEP_DATA._id,
  }).limit(lengthDays).sort({timestamp: -1})
  .select({ sleepDuration: 1, sleepCond: 1, timestamp: 1}).lean()

  SLEEP_DATA_ARR.forEach(item => {delete item._id})
  return SLEEP_DATA_ARR
}

module.exports = {updateSleep, getSleepSeriesData}