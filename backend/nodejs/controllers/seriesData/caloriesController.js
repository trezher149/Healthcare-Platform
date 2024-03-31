const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const {saveScoreCalories, updateScoreCal }= require('./scoreController')

async function updateCalories(userId, calories){
  var caloriesData = await caloriesDataModel.findOne({userId: userId})
  const tableRef = caloriesData._id
  const today = new Date()
  var calData = undefined
  var sameDate = false
  var oldCalories = 0
  const recentCalData = await caloriesSeriesDataModel.findOne({tableRef: tableRef}).sort({timestamp:-1})

  if (!recentCalData) {
    calData = new caloriesSeriesDataModel({
      tableRef: tableRef,
      calories: calories
    })
    caloriesData.caloriesTotal += calData.calories
  }
  else {
    if (today.getDate() == recentCalData.timestamp.getDate()) {
      if (calories > recentCalData.calories) {
        oldCalories = recentCalData.calories
        recentCalData.calories = calories
        caloriesData.caloriesTotal = (caloriesData.caloriesTotal - oldCalories) + calories
      }
      else { return Promise.reject(406) }
      sameDate = true
      calData = recentCalData
    }
    else {
      calData = new caloriesSeriesDataModel({
        tableRef: tableRef,
        calories: calories
      })
      caloriesData.caloriesTotal += calData.calories
    }
  }

  return calData.save().then(async () => {
    await caloriesData.save()
    return saveScoreCalories(userId, calories, oldCalories, sameDate)
  })
  .then((score) => {return score})
  .catch(() => {return Promise.reject(500)})
}

async function getCaloriesSeriesData(userId, lengthDays = 10) {
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const calSeriesData = await caloriesSeriesDataModel.find({
    tableRef: caloriesData._id
  }).limit(lengthDays).sort({timestamp: -1})
  .select({calories: 1, timestamp: 1}).lean() 
  
  calSeriesData.forEach(item => {delete item._id})

  return calSeriesData
}

module.exports = {updateCalories, getCaloriesSeriesData}