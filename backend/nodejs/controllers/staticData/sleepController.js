const sleepDataModel = require('../../models/sleepData')
const sleepDataGoalModel = require('../../models/sleepGoalData')

async function createUserSleepData(userId, optionsData = {}) {
  const sleepData = new sleepDataModel({userId: userId})
  if (Object.keys(optionsData).length > 0) {;}
  return sleepData.save().then(() => {return userId})
  .catch(() => {return 500})
}

async function setSleepGoal(userId, sleepDays, endDays = 14) {
  const PERSONAL_SLEEP_DATA = await sleepDataModel.findOne({userId: userId})
  let LATEST_SLEEP_GOAL = await sleepDataGoalModel.findOne({
    tableRef: PERSONAL_SLEEP_DATA._id,
    isActive: true
  }).sort({setSleepGoalTime: -1})
  const TODAY = new Date()
  const DATE_TO_FINISH = new Date(TODAY)
  DATE_TO_FINISH.setDate(DATE_TO_FINISH.getDate() + endDays) 

  const GOALS = {
    streakGoal: sleepDays,
    scoreToGet: 0,
    endDays: endDays,
    endGoalDate: DATE_TO_FINISH.toLocaleString()
  }

  const FIELDS = {
    tableRef: PERSONAL_SLEEP_DATA._id,
    streakGoal: sleepDays,
    scoreToGet: 0,
    endGoalTime: DATE_TO_FINISH
  }

  if (LATEST_SLEEP_GOAL) {
    if (!LATEST_SLEEP_GOAL.isAchived) {
      const diffDays = (TODAY - LATEST_SLEEP_GOAL.setSleepGoalTime) / (1000 * 3600 * 24)
      if (diffDays < LATEST_SLEEP_GOAL.setGoalIntervalDays) {
        return Promise.reject(406)
      }
    }
  }

  FIELDS.scoreToGet = GOALS.scoreToGet = 3000 + ((sleepDays - 7) * 50)
  if (sleepDays >= 14) {
    FIELDS.scoreToGet = GOALS.scoreToGet = FIELDS.scoreToGet + ((sleepDays - 14) * 100)
  }

  LATEST_SLEEP_GOAL = new sleepDataGoalModel(FIELDS)

  return LATEST_SLEEP_GOAL.save().then(() => {
    PERSONAL_SLEEP_DATA.save()
  }).then(() => { return GOALS })
}

module.exports = {createUserSleepData, setSleepGoal}