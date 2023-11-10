const mongoose = require('mongoose')
const userHealthDataModel = require('../../models/userHealthData')
const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const { updateScoreCal }= require('./scoreController')

async function createNewDataSet(userId, usrHealth, otherData = {}) {
  //  First time user using the app
  // The bmr is the minimum
  // Using Harris-Benedict equation with average IC value in mind
  console.log("Creating a new data set...")
  // Female
  var bmr = 0
  if (usrHealth.sex) {
    bmr = 655.0955 + (9.5634 * usrHealth.weight) + (1.8496 * usrHealth.height) - (4.6756 * usrHealth.age)
  }
  // Male
  else {
    bmr = 66.4730 + (13.7516 * usrHealth.weight )+ (5.0033 * usrHealth.height) - (6.7550 * usrHealth.age)
  }
  var caloriesData = new caloriesDataModel({
    userId: userId,
    bmr: Math.round(bmr) - 329,
  })
  console.log("Creating complete")
  console.log(otherData.setCaloriesGoal)
  if (otherData.setCaloriesGoal) {
    caloriesData.caloriesGoal = otherData.setCaloriesGoal
  }
  console.log("Returning data...")
  return caloriesData
}

async function updateCalories(calories, userId){
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const usrHealth = await userHealthDataModel.findOne({userId: userId})
  var caloriesData = await caloriesDataModel.findOne({userId: userId})
  if (caloriesData == null) {
    caloriesData = await createNewDataSet(userId, usrHealth)
  } 
  var calSeriesData = new caloriesSeriesDataModel({
    calDataSetRef: caloriesData._id,
    calories: calories
  })
  await calSeriesData.save()
  .then(() => {
    caloriesData.caloriesTotal += calories
    if (calories >= caloriesData.caloriesGoal && caloriesData.caloriesGoal > 0){
      caloriesData.hasAchivedTime += 1
    }
  })
  console.log("Saving to database...")
  // Save the caloriesData and update score return with Promise
  return await calData.save()
  .then(updateScoreCal(userId, calories, caloriesData.bmr, caloriesData.hasAchivedTime))
  .then(() => {
    return Promise.resolve("Saved complete!")})
  .catch(() => {return Promise.reject("Error!")})
}

async function getCaloriesData(userId) {
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const calSeriesData = await caloriesSeriesDataModel.find({
    calDataSetRef: calData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ calories: 1, timestamp: 1})
  .exec()
  return {
    'caloriesTotal': caloriesData.caloriesTotal,
    'bmr': caloriesData.bmr,
    'series': calSeriesData
  }
}

async function setCaloriesGoal(userId, data){
  var caloriesData = caloriesDataModel.findById(userId)
  if (caloriesData != null) {
    if (caloriesData.updatedAt.getDate() != Date.now().getDate()){
      caloriesData.caloriesGoal = data.setCaloriesGoal
      caloriesData.hasAchivedTime = 0
      return caloriesData.save().then(() => { return Promise.resolve("Setting complete!") })
    }
    return Promise.reject("Already set!")
  }
  else {
    const usrHealth = await userHealthDataModel.findOne({userId: userId})
    caloriesData = createNewDataSet(userId, usrHealth, data)
    return caloriesData.save().then(() => { Promise.resolve(1) }) 
  }
}

module.exports = {updateCalories, getCaloriesData, setCaloriesGoal}