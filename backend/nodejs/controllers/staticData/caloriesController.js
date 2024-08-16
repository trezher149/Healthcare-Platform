const caloriesDataModel = require('../../models/caloriesData')
const caloriesGoalModel = require('../../models/caloriesGoalData')

function CalculateHarrisBenedict(usrSex, weight, height, age) {
  // Female
  if (usrSex) {
    return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age)
  }
  // Male
  else {
    return 66.4730 + (13.7516 * weight ) + (5.0033 * height) - (6.7550 * age)
  }
}

async function createUserCaloriesData(userId, userHealthData, optionsData = {}) {
  //  First time user using the app
  // The bmr is the minimum
  // Using Harris-Benedict equation with average IC value in mind
  const BMR = Math.round(
    CalculateHarrisBenedict(userHealthData.sex, userHealthData.weight, userHealthData.height, userHealthData.age)
  ) - 329

  const PERSONAL_CALORIES_DATA = new caloriesDataModel({
    userId: userId,
    bmr: BMR,
  })
  if (Object.keys(optionsData).length > 0) {
    setOptions(options,PERSONAL_CALORIES_DATA)
    PERSONAL_CALORIES_DATA.caloriesGoal = otherData.setCaloriesGoal
  }
  return PERSONAL_CALORIES_DATA.save().then(() => {return 200})
  .catch(() => {return 500})
}

async function setCaloriesGoal(userId, caloriesGoalSet, endDays = 7){
  const PERSONAL_CALORIES_DATA = await caloriesDataModel.findOne({userId: userId})
  .then((data) => {return data}).catch(() => {return 500})
  if (PERSONAL_CALORIES_DATA == null) { return Promise.reject(406) }

  let latestCaloriesGoal = await caloriesGoalModel.findOne({
    tableRef: PERSONAL_CALORIES_DATA._id,
    isActive: true
  }).sort({setCaloriesGoalTime: -1})

  const TODAY = new Date()
  const DATE_TO_FINISH = new Date(TODAY)
  DATE_TO_FINISH.setDate(DATE_TO_FINISH.getDate() + endDays)
  // console.log(endDate)
  const MINIMUM_DAYS_TO_SET = 7
  const BMR = PERSONAL_CALORIES_DATA.bmr

  if (latestCaloriesGoal) {
    const DAYS_DIFFERENCE = (TODAY - latestCaloriesGoal.setCaloriesGoalTime) / (1000 * 3600 * 24)
    if (DAYS_DIFFERENCE < latestCaloriesGoal.setGoalIntervalDays && latestCaloriesGoal.isActive) {
      return Promise.reject(406)
    }
    else if (DAYS_DIFFERENCE > latestCaloriesGoal.setGoalIntervalDays) {
      latestCaloriesGoal.isActive = false
      await latestCaloriesGoal.save()
    }
  }

  const SEDENTARY = Math.round(BMR * 0.2)
  const LIGHT = Math.round(BMR * 0.375)
  const MEDIUM = Math.round(BMR * 0.55)
  const HEAVY = Math.round(BMR * 0.725)

  let scoreToGet = 1000
  if (caloriesGoalSet <= SEDENTARY) {
    scoreToGet = scoreToGet + ((caloriesGoalSet / SEDENTARY) * 100)
  }
  else if (caloriesGoalSet <= LIGHT) {scoreToGet += (caloriesGoalSet - SEDENTARY)}
  else if (caloriesGoalSet <= MEDIUM) {scoreToGet += 500 + (caloriesGoalSet - LIGHT)}
  else if (caloriesGoalSet <= HEAVY) {scoreToGet += 1000 + (caloriesGoalSet - MEDIUM)}
  else {scoreToGet += 1500 + (caloriesGoalSet - HEAVY)}

  if (endDays / MINIMUM_DAYS_TO_SET > 2) {
    const percentReduce = 1 - (Math.log10(endDays - (MINIMUM_DAYS_TO_SET * 2)) + 0.05)
    if (percentReduce < 0.4) {
      return Promise.reject(406)
    }
    scoreToGet *= percentReduce
  }

  const GOALS_RESULT = {
    caloriesGoal: caloriesGoalSet,
    endDays: endDays,
    scoreToGet: Math.ceil(scoreToGet),
    endGoalTime: DATE_TO_FINISH.toLocaleString()
  }

  const FIELDS = {
    tableRef: PERSONAL_CALORIES_DATA._id,
    caloriesGoal: caloriesGoalSet,
    scoreToGet: Math.ceil(scoreToGet),
    endGoalTime: DATE_TO_FINISH
  }

  latestCaloriesGoal = new caloriesGoalModel(FIELDS)

  return latestCaloriesGoal.save().then(() => {
    return PERSONAL_CALORIES_DATA.save()
  })
  .then(() => { return GOALS_RESULT })
  .catch(() => {
    return Promise.reject(500)
  })
}

module.exports = {createUserCaloriesData, setCaloriesGoal}