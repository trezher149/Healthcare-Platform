const scoreDataModel = require('../../models/scoreData')
const scoreSeriesDataModel = require('../../models/scoreSeriesData')
const caloriesDataModel = require('../../models/caloriesData')
const caloriesGoalModel= require('../../models/caloriesGoalData')
const sleepDataModel = require('../../models/sleepData')
const sleepGoalDataModel = require('../../models/sleepGoalData')

async function saveScore(userId, realScore) {
  const scoreData = await scoreDataModel.findOne({userId: userId})
  console.log(scoreData)
  const today = new Date()
  var latestDate = undefined
  if (scoreData == null) {
    scoreData = new scoreDataModel({
      userId: userId
    })
  }
  var scoreSeriesData = await scoreSeriesDataModel
    .findOne({tableRef: scoreData._id}).sort({timestamp: -1})
  console.log(scoreSeriesData)
  if (scoreSeriesData != null) {
    latestDate = scoreSeriesData.timestamp
    console.log(latestDate.toLocaleString())
  }

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
  const scoreResult = {
    score: realScore,
    totalScore: scoreSeriesData.score
  }
  return scoreSeriesData.save().then(() => {
    return scoreData.save()
  }).then(() => {return scoreResult})
  .catch(() => {return 500})
}

async function saveScoreCalories(userId, calories) {
  const baseScore = 100
  var realScore = 0
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const sedentary = Math.round(caloriesData.bmr * 0.2)
  const today = Date.now()
  if (calories <= sedentary) {
    realScore = Math.round(calories / sedentary * baseScore) 
  }
  else {realScore = baseScore + Math.round(calories * 0.2)}

  const caloriesGoal = await caloriesGoalModel.findOne({tableRef: caloriesData._id})
                      .sort({setCaloriesGoalTime: -1})
  const results = {
    score: 0,
    achiveScore: 0,
    totalScore: 0,
    hasGoal: true,
    caloriesTotal: 0,
    caloriesGoal: 0,
    isAchived: false,
    isActive: true
  }
  console.log(caloriesGoal == null)
  if (caloriesGoal == null) {
    return saveScore(userId, realScore).then((score) => {
      results.score = score.score
      results.totalScore = score.totalScore
      results.hasGoal = false
      console.log(results)
      return results
    })
  }

  const diffDays = today - caloriesGoal.endGoalTime
  if (diffDays > 0 && !caloriesGoal.isAchived) {
    results.isActive = caloriesGoal.isActive = false
    await caloriesGoal.save()
    await caloriesGoalModel.create({tableRef: caloriesData._id, isRenew: true})
    return saveScore(userId, realScore).then(async (score) => {
      await caloriesDataGoal.save()
      results.score = score.score
      results.totalScore = score.totalScore
      return results
    })
  } 
  if (!caloriesGoal.isAchived) {
    caloriesGoal.caloriesTotal += calories
    if (caloriesGoal.caloriesTotal >= caloriesGoal.caloriesGoal) {
      realScore += caloriesGoal.scoreToGet
      results.achiveScore = caloriesGoal.scoreToGet
      results.isAchived = caloriesGoal.isAchived = true
      results.isActive = caloriesGoal.isActive = false
    }
  }
  else {
    results.isAchived = false
    results.isActive = false
  }

  if (results.isActive) {
    results.caloriesTotal = caloriesGoal.caloriesTotal
    if (caloriesGoal.caloriesTotal > caloriesData.caloriesGoal) {
      results.caloriesGoal = results.caloriesGoal
    }
    else { results.caloriesGoal = caloriesGoal.caloriesGoal }
  }
  
  return saveScore(userId, realScore).then(async (score) => {
    await caloriesGoal.save()
    results.score = score.score
    results.totalScore = score.totalScore
    return results
  })

}

async function saveScoreSleep(userId, minutes) {
  const baseScore = 400
  const sleepPunish = 350
  var streakScore = 40
  var realScore = 0

  const sleepData = await sleepDataModel.findOne({userId: userId})
  const sleepGoalData = await sleepGoalDataModel.findOne({tableRef: sleepData._id})
                        .sort({setSleepGoalTime: -1})
  const results = {
    score: 0,
    totalScore: 0,
    hasGoal: true,
    streakTotal: 0,
    streakGoal: 0,
    isAchived: false
  }
  if (minutes > 460 && minutes < 500) {
    realScore = baseScore
    if (sleepGoalData == null) {}
    else if (sleepGoalData.isActive) {
      sleepGoalData.sleepStreakTotal += 1
      if (sleepGoalData.sleepStreakTotal == sleepGoalData.streakGoal) {
        realScore += 2000
        results.isAchived = sleepGoalData.isAchived = true
        sleepGoalData.isActive = false 
      }
      streakScore += streakScore * sleepGoalData.sleepStreakTotal
      realScore += streakScore
    }
  }
  else {
    if (sleepGoalData) { sleepGoalData.sleepStreakTotal = 0 }
    realScore = baseScore - sleepPunish
  }
  if (sleepGoalData) {
    return sleepGoalData.save().then(() => {
      return saveScore(userId, realScore)
    }).then(async (score) => {
      await sleepData.save()
      results.score = score.score
      results.totalScore = score.totalScore
      results.streakTotal = sleepGoalData.sleepStreakTotal
      results.streakGoal = sleepGoalData.streakGoal
      return results
    })
  }
  else {
    return saveScore(userId, realScore).then(async (score) => {
      await sleepData.save()
      results.score = score.score
      results.totalScore = score.totalScore
      results.hasGoal = false
      return results
    })
  }
}

module.exports = {saveScoreCalories, saveScoreSleep}