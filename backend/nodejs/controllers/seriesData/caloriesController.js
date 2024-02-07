const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const {saveScoreCalories, updateScoreCal }= require('./scoreController')

async function updateCalories(userId, calories){
  var caloriesData = await caloriesDataModel.findOne({userId: userId})
  // if (caloriesData == null) {
  //   caloriesData = await createNewDataSet(userId, usrHealth)
  // } 
  const tableRef = caloriesData._id
  var calSeriesData = new caloriesSeriesDataModel({
    tableRef: tableRef,
    calories: calories
  })
  return calSeriesData.save().then(async () => {
    caloriesData.caloriesTotal += calories
    await caloriesData.save()
    return saveScoreCalories(userId, calories)
  })
  .then((score) => {return score})
  .catch(() => {
    return Promise.reject("Error!")})
}

async function getCaloriesSeriesData(userId) {
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const calSeriesData = await caloriesSeriesDataModel.find({
    tableRef: caloriesData._id
  }).limit(30).sort({timestamp: -1})
  .select({ calories: 1, timestamp: 1})
  .exec()

  return {
    'series': calSeriesData
  }
}

module.exports = {updateCalories, getCaloriesSeriesData}