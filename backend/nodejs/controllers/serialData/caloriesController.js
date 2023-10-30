const mongoose = require('mongoose')
const userHealthData = require('../../models/userHealthData')
const caloriesData = require('../../models/caloriesData')
const caloriesSeriesData = require('../../models/caloriesSeriesData')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

async function updateCalories(data){
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const usrHealth = await userHealthData.findOne({userId: data.userId})
  var calData = await caloriesData.findOne({userId: data.userId})
  if (calData == null) {
    //  First time user using the app 
    calData = new caloriesData({
      userId: data.userId,
      caloriesTotal: data.calories,
    })
    calData.save()
    .then(() => {return Promise.resolve(2)})
  }
  calSeriesData = new caloriesSeriesData({
    calDataSetRef: calData._id,
    calories: data.calories
  })
  await calSeriesData.save()
  .then(() => {
    calData.caloriesTotal += data.calories
    calData.save()
  })
  .then(() => {return Promise.resolve(1)})

}

async function getCaloriesData(userId) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const calData = await caloriesData.findOne({userId: userId})
  const calSeriesData = await calSeriesData.find({
    calDataSetRef: calData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ calories: 1, timestamp: 1})
  .exec().lean()
  return {
    'caloriesTotal': calData.caloriesTotal,
    'series': calSeriesData
  }
}

module.exports = {updateCalories, getCaloriesData}