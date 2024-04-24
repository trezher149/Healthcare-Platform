const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const {saveScoreCalories, updateScoreCal }= require('./scoreController')

async function updateCalories(userId, calories){
  var caloriesData = await caloriesDataModel.findOne({userId: userId})
  const tableRef = caloriesData._id
  const today = new Date()
  var calData = undefined
  var oldCalories = 0
  const recentCalData = await caloriesSeriesDataModel.findOne({tableRef: tableRef}).sort({timestamp:-1})
  var activityLvl = 0 // 0 sedentary, 1 light, 2 moderate, 3 active

  const sedentary = Math.round(caloriesData.bmr * 0.2)
  const light = Math.round(caloriesData.bmr * 0.375)
  const moderate = Math.round(caloriesData.bmr * 0.55)
  // const active = Math.round(caloriesData.bmr * 0.725)

  if (calories >= sedentary) { activityLvl += 1}
  if (calories >= light) { activityLvl += 1}
  if (calories >= moderate) { activityLvl += 1 }

  if (!recentCalData) {
    calData = new caloriesSeriesDataModel({
      tableRef: tableRef,
      calories: calories,
      activityLvl: activityLvl
    })
    caloriesData.caloriesTotal += calData.calories
  }
  else {
    if (today.getDate() == recentCalData.timestamp.getDate()) {
      if (calories > recentCalData.calories) {
        oldCalories = recentCalData.calories
        recentCalData.calories = calories
        recentCalData.activityLvl = activityLvl
        caloriesData.caloriesTotal = (caloriesData.caloriesTotal - oldCalories) + calories
      }
      else { return Promise.reject(406) }
      calData = recentCalData
      calData.timestamp = today
    }
    else {
      calData = new caloriesSeriesDataModel({
        tableRef: tableRef,
        calories: calories,
        activityLvl: activityLvl
      })
      caloriesData.caloriesTotal += calData.calories
    }
  }

  return calData.save().then(async () => {
    await caloriesData.save()
    return saveScoreCalories(userId, calories, oldCalories, activityLvl)
  })
  .then((score) => {return score})
  .catch(() => {return Promise.reject(500)})
}

async function getCaloriesSeriesData(userId, lengthDays = 3) {
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const calSeriesData = await caloriesSeriesDataModel.find({
    tableRef: caloriesData._id
  }).limit(lengthDays).sort({timestamp: -1})
  .select({calories: 1, activityLvl: 1, timestamp: 1}).lean() 
  
  calSeriesData.forEach(item => {delete item._id})

  return calSeriesData
}

module.exports = {updateCalories, getCaloriesSeriesData}