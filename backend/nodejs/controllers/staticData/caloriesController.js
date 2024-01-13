const caloriesDataModel = require('../../models/caloriesData')

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

async function setCaloriesGoal(userId, caloriesGoal, streakGoal = 0){
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  .then((data) => {return data}).catch(() => {return 500})
  if (caloriesData === 500) {
    return caloriesData
  }
  if (caloriesData != null) {
    var differenceSetCalDays = 0
    var differenceSetStkDays = 0
    const today = Date.now()
    const setCalGoalTime = caloriesData.goal.setCaloriesGoalTime ?? undefined
    const setStkGoalTime = caloriesData.goal.setStreakGoalTime ?? undefined
    const setCalIntvalDays = caloriesData.goal.setCaloriesGoalIntervalDay
    const setStkIntvalDays = caloriesData.goal.setStreakGoalIntervalDay
    if (setCalGoalTime) {
      differenceSetCalDays =  Math.round(
        (today - setCalGoalTime.getTime())
        / (1000 * 3600 * 24)
      )
    }
    // if (differenceSetCalDays >= setCalIntvalDays ) {
    //   caloriesData.goal.setCaloriesGoalTime = today
    //   caloriesData.goal.caloriesGoal = caloriesGoal
    //   caloriesData.goal.streak = 0
    //   caloriesData.goal.hasAchived = false
    // }
    caloriesData.goal.caloriesGoal = caloriesGoal
    caloriesData.goal.streak = 0
    caloriesData.goal.hasAchived = false
    if (streakGoal > 6) {
      if (setStkGoalTime) {
        differenceSetStkDays =  Math.round(
          (today - setStkGoalTime.getTime())
          / (1000 * 3600 * 24)
        )
      }
      // if (differenceSetStkDays >= setStkIntvalDays ) {
      //   caloriesData.goal.setStreakGoalTime = today
      //   caloriesData.goal.streakGoal = streakGoal
      // }
      caloriesData.goal.streakGoal = streakGoal
    }
    return caloriesData.save().then(() => {
        return 200
      })
      .catch(() => {
        return 500
      })
  }
  else {
    return Promise.reject(406)
  }
}

module.exports = {createUserCaloriesData, setCaloriesGoal}