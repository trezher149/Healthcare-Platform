const userHealthDataModel = require('../../models/userHealthData')
const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const { updateScoreCal }= require('./scoreController')

async function updateCalories(calories, userId){
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

  caloriesData.caloriesTotal += calories
  if (calories >= caloriesData.caloriesGoal && caloriesData.caloriesGoal > 0){
    caloriesData.hasAchivedTime += 1
  }
  caloriesData.save()
  return updateScoreCal(userId, calories, caloriesData.bmr, caloriesData.hasAchivedTime)
  .then((score) => {
    return Promise.resolve(score)})
  .catch(() => {
    return Promise.reject("Error!")})
}

async function getCaloriesSeriesData(userId) {
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const calSeriesData = await caloriesSeriesDataModel.find({
    calDataSetRef: caloriesData._id,
  }).limit(30).sort({timestamp: -1})
  .select({ calories: 1, timestamp: 1})
  .exec()

  return {
    'series': calSeriesData
  }
}

module.exports = {updateCalories, getCaloriesSeriesData}