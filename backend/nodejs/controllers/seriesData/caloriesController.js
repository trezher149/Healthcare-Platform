const caloriesDataModel = require('../../models/caloriesData')
const caloriesSeriesDataModel = require('../../models/caloriesSeriesData')
const {saveScoreCalories}= require('./scoreController')

async function updateCalories(userId, caloriesBurned){
  const PERSONAL_CALORIES_DATA = await caloriesDataModel.findOne({userId: userId})
  const TABLE_REF_ID = PERSONAL_CALORIES_DATA._id

  const TODAY = () => {
    const TODAY_OBJ = new Date()
    return `${TODAY_OBJ.getFullYear()}-${TODAY_OBJ.getMonth()}-${TODAY_OBJ.getDate()}`
  }

  let latestCalories = 0
  const LATEST_CALORIES_DATA = await caloriesSeriesDataModel
  .findOne({
    tableRef: TABLE_REF_ID,
    timestamp: { $gte: TODAY()}
  }).sort({timestamp:-1})

  let activityLvl = 0 // 0 sedentary, 1 light, 2 moderate, 3 active
  const SEDENTARY = Math.round(PERSONAL_CALORIES_DATA.bmr * 0.2)
  const LIGHT = Math.round(PERSONAL_CALORIES_DATA.bmr * 0.375)
  const MODERATE = Math.round(PERSONAL_CALORIES_DATA.bmr * 0.55)
  // const active = Math.round(caloriesData.bmr * 0.725)

  if (caloriesBurned >= SEDENTARY) { activityLvl += 1}
  if (caloriesBurned >= LIGHT) { activityLvl += 1}
  if (caloriesBurned >= MODERATE) { activityLvl += 1 }

  if (!LATEST_CALORIES_DATA) {
    var caloriesResult = new caloriesSeriesDataModel({
      tableRef: TABLE_REF_ID,
      calories: caloriesBurned,
      activityLvl: activityLvl
    })
    PERSONAL_CALORIES_DATA.caloriesTotal += caloriesResult.calories
  }
  else {
    if (caloriesBurned > LATEST_CALORIES_DATA.calories) {
      latestCalories = LATEST_CALORIES_DATA.calories
      LATEST_CALORIES_DATA.calories = caloriesBurned
      LATEST_CALORIES_DATA.activityLvl = activityLvl
      PERSONAL_CALORIES_DATA.caloriesTotal = (PERSONAL_CALORIES_DATA.caloriesTotal - latestCalories) + caloriesBurned
    }
    else { return Promise.reject(406) }
    var caloriesResult = LATEST_CALORIES_DATA
    caloriesResult.timestamp = new Date()
  }

  await caloriesResult.save()
  await PERSONAL_CALORIES_DATA.save()
  return saveScoreCalories(userId, caloriesBurned, latestCalories, activityLvl)
  .then((result) => {return result}, () => {return Promise.reject(500)})
}

async function getCaloriesSeriesData(userId, lengthDays = 3) {
  const PERSONAL_CALORIES_DATA = await caloriesDataModel.findOne({userId: userId})
  const CALORIES_DATA_ARR = await caloriesSeriesDataModel.find({
    tableRef: PERSONAL_CALORIES_DATA._id
  }).limit(lengthDays).sort({timestamp: -1})
  .select({calories: 1, activityLvl: 1, timestamp: 1}).lean() 
  
  CALORIES_DATA_ARR.forEach(item => {delete item._id})

  return CALORIES_DATA_ARR
}

module.exports = {updateCalories, getCaloriesSeriesData}