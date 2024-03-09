const sleepDataModel = require('../../models/sleepData')
const sleepDataGoalModel = require('../../models/sleepGoalData')

async function createUserSleepData(userId, optionsData = {}) {
  const sleepData = new sleepDataModel({userId: userId})
  if (Object.keys(optionsData).length > 0) {;}
  return sleepData.save().then(() => {return userId})
  .catch(() => {return 500})
}

async function setSleepGoal(userId, sleepDays, endDays = 14) {
  const sleepData = await sleepDataModel.findOne({userId: userId})
  var sleepDataGoal = await sleepDataGoalModel.findOne({tableRef: sleepData._id})
                        .sort({setSleepGoalTime: -1})
  console.log(sleepData)
  console.log(sleepDataGoal)
  const today = new Date()
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + endDays) 

  const goals = {
    streakGoal: sleepDays,
    scoreToGet: 0,
    endDays: endDays,
    endGoalDate: endDate.toLocaleString()
  }

  const fields = {
    tableRef: sleepData._id,
    streakGoal: sleepDays,
    scoreToGet: 0,
    endGoalTime: endDate
  }

  if (sleepDataGoal) {
    if (!sleepDataGoal.isAchived) {
      const diffDays = (today - sleepDataGoal.setSleepGoalTime) / (1000 * 3600 * 24)
      if (diffDays < sleepDataGoal.setGoalIntervalDays) {
        return Promise.reject(406)
      }
    }
  }

  fields.scoreToGet = goals.scoreToGet = 3000 + ((sleepDays - 14) * 100)

  sleepDataGoal = new sleepDataGoalModel(fields)

  return sleepDataGoal.save().then(() => {
    sleepData.save()
  }).then(() => { return goals })
}

module.exports = {createUserSleepData, setSleepGoal}