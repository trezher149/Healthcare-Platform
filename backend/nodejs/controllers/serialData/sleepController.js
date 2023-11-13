const mongoose = require('mongoose')
const sleepDataModel = require('../../models/sleepData')
const sleepSerialDataModel = require('../../models/sleepSeriesData')
const { updateScoreSleep } = require('./scoreController')

async function updateSleep(userId, sleepDur){
  var sleepData = await sleepDataModel.findOne({userId: userId})
  if (sleepData == null) {
    //  First time user using the app 
    console.log("Creating new sleep data set...")
    sleepData = new sleepDataModel({
      userId: userId,
    })
  }
  const sleepSeriesData = new sleepSerialDataModel({
    sleepDataSetRef: sleepData._id,
    sleepDuration: sleepDur
  })
  console.log("Saving serial data...")
  await sleepSeriesData.save()
  if (sleepDur > 750 && sleepDur < 830) {
    sleepData.sleepWellCount += 1
    sleepData.streak += 1
    if (sleepData.streak == sleepData.streakGoal){
      sleepData.hasAchived = true
      sleepData.streak = 0
    }
  }
  else {
    sleepData.streak = 0
  }
  console.log("Saving...")
  sleepData.save()
  return updateScoreSleep(userId, sleepDur, sleepData.streak, sleepData.streakGoal, sleepData.hasAchived)
  .then(() => {return "Score has updated!"})

}

async function getSleepData(userId) {
  const sData = await sleepData.findOne({userId: userId})
  const sSeriesData = await sleepSeriesData.find({
    sleepDataSetRef: sData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ sleepDuration: 1, timestamp: 1})
  .exec()
  return {
    'series': sSeriesData
  }
}

module.exports = {updateSleep, getSleepData}