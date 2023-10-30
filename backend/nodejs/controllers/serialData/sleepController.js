const mongoose = require('mongoose')
const sleepData = require('../../models/sleepData')
const sleepSerialData = require('../../models/sleepSeriesData')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

async function updateSleep(data){
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  var sData = await sleepData.findOne({userId: data.userId})
  if (sData == null) {
    //  First time user using the app 
    sData = new caloriesData({
      userId: data.userId,
    })
    sData.save()
    .then(() => {return Promise.resolve(2)})
  }
  sSeriesData = new caloriesSerialData({
    sleepDataSetRef: calData._id,
    sleepDuration: data.sleepDur
  })
  await sSeriesData.save()
  .then(() => {return Promise.resolve(1)})

}

async function getSleepData(userId) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const sData = await sleepData.findOne({userId: data.userId})
  const sSeriesData = await sleepSeriesData.find({
    sleepDataSetRef: sData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ sleepDuration: 1, timestamp: 1})
  .exec().lean()
  return {
    'series': sSeriesData
  }
}

module.exports = {updateSleep, getSleepData}