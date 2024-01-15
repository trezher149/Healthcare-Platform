const scoreDataModel = require('../../models/scoreData')
const scoreSeriesDataModel = require('../../models/scoreSeriesData')
const caloriesDataModel = require('../../models/caloriesData')
const sleepDataModel = require('../../models/sleepData')

async function saveScore(userId, realScore) {
  const scoreData = await scoreDataModel.findOne({userId: userId})
  const today = new Date()
  var latestDate = undefined
  if (scoreData == null) {
    scoreData = new scoreDataModel({
      userId: userId
    })
  }
  var scoreSeriesData = await scoreSeriesDataModel
    .findOne({tableRef: scoreData._id}).sort({timestamp: -1})
  if (scoreSeriesData) {latestDate = scoreSeriesData.timestamp}

  if (!latestDate) {
    scoreSeriesData = new scoreSeriesDataModel({
      tableRef: scoreData._id,
      score: realScore
    })
  }
  else if (today.getDay() == latestDate.getDay()) {
    scoreSeriesData.score += realScore 
    scoreSeriesData.timestamp = today
  }
  else {
    scoreSeriesData = new scoreSeriesDataModel({
      tableRef: scoreData._id,
      score: realScore
    })
  }
  scoreData.totalScore += realScore
  return scoreSeriesData.save().then(() => {
    return scoreData.save()
  }).then(() => {return scoreSeriesData.score})
  .catch(() => {return 500})
}

async function saveScoreCalories(userId, calories) {
  const baseScore = 100
  var streakScore = 20
  var realScore = 0
  const caloriesDataGoal = await caloriesDataModel.findOne({userId: userId})
  const sedentary = Math.round(caloriesDataGoal.bmr * 0.2)

  if (calories <= sedentary) {
    realScore = Math.round(calories / sedentary * baseScore) 
  }
  else {realScore = baseScore + Math.round(calories * 0.2)}

  if (calories < caloriesDataGoal.goal.caloriesGoal) {
    caloriesDataGoal.goal.streak = 0
  }
  else { caloriesDataGoal.goal.streak += 1 }

  if (!caloriesDataGoal.goal.hasAchived && caloriesDataGoal.goal.streak > 0) {
    streakScore += streakScore * caloriesDataGoal.goal.streak
    if (caloriesDataGoal.goal.streak == caloriesDataGoal.goal.streakGoal) {
      streakScore += caloriesDataGoal.goal.streakGoal * 10
      caloriesDataGoal.goal.hasAchived = true
    }
  }

  realScore += streakScore
  return saveScore(userId, realScore).then(async (score) => {
    await caloriesDataGoal.save()
    return score
  })

}

async function saveScoreSleep(userId, minutes) {
  const baseScore = 400
  const sleepPunish = 300
  var streakScore = 40
  var realScore = 0

  const sleepData = await sleepDataModel.findOne({userId: userId})
  if (minutes > 460 && minutes < 500) {
    sleepData.goal.streak += 1
    realScore = baseScore
    if (!sleepData.goal.hasAchived && sleepData.goal.streakGoalDay > 0){
      streakScore += streakScore * sleepData.goal.streak
      if (sleepData.goal.streak == sleepData.goal.streakGoalDay) {
        streakScore += sleepData.goal.streakGoalDay * 10
        sleepData.goal.hasAchived = true
      }
      realScore += streakScore
    }
  }
  else {
    sleepData.goal.streak = 0
    realScore = baseScore - sleepPunish
  }
  return saveScore(userId, realScore).then(async (score) => {
    await sleepData.save()
    return score
  })
}

module.exports = {saveScoreCalories, saveScoreSleep}