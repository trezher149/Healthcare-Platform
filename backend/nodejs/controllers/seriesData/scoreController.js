const scoreDataModel = require('../../models/scoreData')
const scoreSeriesDataModel = require('../../models/scoreSeriesData')
const caloriesDataModel = require('../../models/caloriesData')
const caloriesData = require('../../models/caloriesData')

const achivedTimeLimit = 5
const sleepPunish = 300

async function saveScore(userId, realScore) {
  var scoreData = await scoreDataModel.findOne({userId: userId})
  if (scoreData == null) {
    scoreData = new scoreDataModel({
      userId: userId
    })
  }
  return scoreSeriesDataModel.create({
    scoreDataSetRef: scoreData._id,
    score: realScore
  }).then(async () => {
    scoreData.totalScore += realScore
    return scoreData.save().then(async () => {
      return realScore
    })
  }).catch(() => {return 500})
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
  return saveScore(userId, realScore).then(async () => {
    return caloriesDataGoal.save().then(() => {
      return realScore
    })
  }
  )


}
module.exports = {saveScoreCalories}