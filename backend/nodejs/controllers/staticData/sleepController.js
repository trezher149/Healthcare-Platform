const sleepDataModel = require('../../models/sleepData')

async function createUserSleepData(userId, optionsData = {}) {
  const sleepData = new sleepDataModel({userId: userId})
  if (Object.keys(optionsData).length > 0) {;}
  return sleepData.save().then(() => {return 200})
  .catch(() => {return 500})
}

async function setSleepGoal(userId, streakGoal) {
  const sleepData = await sleepDataModel.findOne({userId: userId})
  const today = Date.now()
  const setStkGoalTime = sleepData.goal.setStreakGoalTime
  const setStkGoalIntvalDay = sleepData.goal.setStreakGoalIntervalDay
  var differenceSetStkDays = 0
  if (setStkGoalTime) {
    differenceSetStkDays = Math.round(
      (today - setStkGoalTime.getTime())
      / (1000 * 3600 * 24)
    )
  }
  // if (differenceSetStkDays >= setStkGoalIntvalDay) {
  //   sleepData.goal.streak = 0
  //   sleepData.goal.streakGoalDay = streakGoal
  //   sleepData.goal.hasAchived = false
  // }
  sleepData.goal.streak = 0
  sleepData.goal.streakGoalDay = streakGoal
  sleepData.goal.hasAchived = false
  return sleepData.save().then(() => {return 200}).catch(() => {return Promise.reject(500)})
}

module.exports = {createUserSleepData, setSleepGoal}