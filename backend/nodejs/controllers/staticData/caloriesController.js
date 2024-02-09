const caloriesDataModel = require('../../models/caloriesData')
const caloriesGoalModel = require('../../models/caloriesGoalData')

function HarrisBenedict(usrSex, weight, height, age) {
  // Female
  if (usrSex) {
    return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age)
  }
  // Male
  else {
    return 66.4730 + (13.7516 * weight ) + (5.0033 * height) - (6.7550 * age)
  }
}

async function createUserCaloriesData(userId, usrHealth, optionsData = {}) {
  //  First time user using the app
  // The bmr is the minimum
  // Using Harris-Benedict equation with average IC value in mind
  const bmr = Math.round(
    HarrisBenedict(usrHealth.sex, usrHealth.weight, usrHealth.height, usrHealth.age)
  ) - 329
  var caloriesData = new caloriesDataModel({
    userId: userId,
    bmr: bmr,
  })
  if (Object.keys(optionsData).length > 0) {
    setOptions(options,caloriesData)
    caloriesData.caloriesGoal = otherData.setCaloriesGoal
  }
  return caloriesData.save().then(() => {return 200})
  .catch(() => {return 500})
}

async function setCaloriesGoal(userId, caloriesGoalVal, endDays = 7){
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  .then((data) => {return data}).catch(() => {return 500})
  if (caloriesData == null) {
    return Promise.reject(406)
  }
  var caloriesGoal = await caloriesGoalModel.findOne({tableRef: caloriesData._id})
                      .sort({setCaloriesGoalTime: -1})

  const today = new Date()
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + endDays)
  const minimumDays = 7
  const bmr = caloriesData.bmr

  if (caloriesGoal) {
    if (!caloriesGoal.isAchived) {
      const diffDays = (today - caloriesGoal.setCaloriesGoalTime) / (1000 * 3600 * 24)
      if (diffDays < caloriesGoal.setGoalIntervalDays && caloriesGoal.isActive) {
        return Promise.reject(406)
      }
    }
  }

  const sedentary = Math.round(bmr * 0.2)
  const light = Math.round(bmr * 0.375)
  const medium = Math.round(bmr * 0.55)
  const heavy = Math.round(bmr * 0.725)

  var scoreToGet = 1000
  if (caloriesGoalVal < sedentary) {
    scoreToGet = scoreToGet * (caloriesGoalVal / sedentary) * 100
  }
  else if (caloriesGoalVal < light) {}
  else if (caloriesGoalVal < medium) {scoreToGet += 500}
  else if (caloriesGoalVal < heavy) {scoreToGet += 1000}
  else {scoreToGet += 1500}

  if (endDays % minimumDays > 2) {
    scoreToGet *= 1 - ((endDays - (miminumDays * 2)) * 0.75) 
  }

  const goals = {
    caloriesGoal: caloriesGoalVal,
    endDays: endDays,
    scoreToGet: scoreToGet,
    endGoalTime: endDate.toLocaleString()
  }

  const fields = {
    tableRef: caloriesData._id,
    caloriesGoal: caloriesGoalVal,
    scoreToGet: scoreToGet,
    endGoalTime: endDate
  }

  caloriesGoal = new caloriesGoalModel(fields)

  return caloriesGoal.save().then(() => {
    return caloriesData.save()
  })
  .then(() => { return goals})
  .catch(() => {
    return Promise.reject(500)
  })
}

module.exports = {createUserCaloriesData, setCaloriesGoal}