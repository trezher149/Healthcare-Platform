const scoreDataModel = require('../../models/scoreData')
const scoreSeriesDataModel = require('../../models/scoreSeriesData')
const caloriesDataModel = require('../../models/caloriesData')
const caloriesGoalModel= require('../../models/caloriesGoalData')
const sleepDataModel = require('../../models/sleepData')
const sleepGoalDataModel = require('../../models/sleepGoalData')

async function saveScore(userId, realScore) {
  //Change later
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
  // console.log(scoreSeriesData)
  if (scoreSeriesData != null) {
    latestDate = scoreSeriesData.timestamp
    // console.log(today.getDate())
    // console.log(latestDate.getDate())
    // console.log(today.getDate() == latestDate.getDate())
  }

  if (!latestDate) {
    console.log(latestDate)
    scoreSeriesData = new scoreSeriesDataModel({
      tableRef: scoreData._id,
      score: realScore
    })
  }
  else if (today.getDate() != latestDate.getDate()) {
    scoreSeriesData = new scoreSeriesDataModel({
      tableRef: scoreData._id,
      score: realScore
    })
  }
  else {
    scoreSeriesData.score += realScore
    scoreSeriesData.timestamp = today
  }

  const scoreResult = {
    score: realScore,
    totalScore: scoreSeriesData.score
  }
  console.log(scoreResult)
  scoreData.totalScore += realScore
  return scoreSeriesData.save().then(() => {
    return scoreData.save()
  }).then(() => {return scoreResult})
  .catch(() => {return 500})
}

async function saveScoreCalories(userId, calories, oldCalories, activityLvl) {
  const baseScore = 100
  var oldScore = 0
  const caloriesData = await caloriesDataModel.findOne({userId: userId})
  const today = Date.now()
  const sedentary = Math.round(caloriesData.bmr * 0.2)
  var newScore = (calories <= sedentary) ? Math.round(calories / sedentary * baseScore) :
                  baseScore + Math.round(calories * 0.2)
  if (oldCalories > 0) {
    oldScore = (oldCalories <= sedentary) ? Math.round(oldCalories / sedentary * baseScore) :
                baseScore + Math.round(oldCalories * 0.2)
  }

  // console.log(newScore)
  // console.log(oldScore)
  newScore -= oldScore
  // console.log(newScore)

  const caloriesGoal = await caloriesGoalModel.findOne({tableRef: caloriesData._id})
                      .sort({setCaloriesGoalTime: -1})
  const results = {
    activityLvl: activityLvl,
    score: 0,
    achiveScore: 0,
    totalScore: 0,
    hasGoal: true,
    caloriesTotal: 0,
    caloriesGoal: 0,
    isAchived: false,
    isActive: true,
    daysLeft: 0
  }
  if (caloriesGoal == null) {
    return saveScore(userId, newScore).then((score) => {
      results.score = score.score
      results.totalScore = score.totalScore
      results.hasGoal = false
      console.log(results)
      return results
    })
  }

  const diffDays = today - caloriesGoal.endGoalTime
  results.daysLeft = Math.ceil(-diffDays / (1000 * 60 * 60 * 24))
  if (diffDays > 0 && !caloriesGoal.isAchived) {
    results.isActive = caloriesGoal.isActive = false
    await caloriesGoal.save()
    await caloriesGoalModel.create({tableRef: caloriesData._id, isRenew: true})
    return saveScore(userId, newScore).then(async (score) => {
      await caloriesDataGoal.save()
      results.score = score.score
      results.totalScore = score.totalScore
      return results
    })
  } 
  if (!caloriesGoal.isAchived) {
    caloriesGoal.caloriesTotal += (calories - oldCalories)
    if (caloriesGoal.caloriesTotal >= caloriesGoal.caloriesGoal) {
      newScore += caloriesGoal.scoreToGet
      results.achiveScore = caloriesGoal.scoreToGet
      results.isAchived = caloriesGoal.isAchived = true
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
  
  return saveScore(userId, newScore).then(async (score) => {
    await caloriesGoal.save()
    results.score = score.score
    results.totalScore = score.totalScore
    return results
  })

}

async function saveScoreSleep(userId, minutes) {
  const baseScore = 400
  const sleepPunish = 350
  var realScore = 0

  const sleepData = await sleepDataModel.findOne({userId: userId})
  const sleepGoalData = await sleepGoalDataModel.findOne({tableRef: sleepData._id})
                        .sort({setSleepGoalTime: -1})
  const results = {
    sleepCond: true,
    score: 0,
    totalScore: 0,
    goalScore: 0,
    hasGoal: true,
    streakTotal: 0,
    streakGoal: 0,
    isAchived: false,
    isActive: true,
  }

  if (minutes >= 420) {
    realScore = baseScore
    if (sleepGoalData == null) {}
    else if (sleepGoalData.isActive) {
      sleepGoalData.sleepStreakTotal += 1
      if (sleepGoalData.sleepStreakTotal == sleepGoalData.streakGoal) {
        results.goalScore = sleepGoalData.scoreToGet
        realScore += results.goalScore 
        results.isAchived = sleepGoalData.isAchived = true
        sleepGoalData.isActive = false 
      }
    }
  }
  else {
    if (sleepGoalData) { sleepGoalData.sleepStreakTotal = 0 }
    realScore = baseScore - sleepPunish
    results.sleepCond = false
  }
  if (sleepGoalData) {
    return sleepGoalData.save().then(() => {
      return saveScore(userId, realScore)
    }).then(async (score) => {
      await sleepData.save()
      results.score = score.score
      results.totalScore = score.totalScore
      results.achiveScore = sleepGoalData.scoreToGet
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
      results.isActive = false
      return results
    })
  }
}

async function listScore(userId, lengthDays = 10) {
  const scoreData = await scoreDataModel.findOne({userId: userId})
  const scoreSeriesData = await scoreSeriesDataModel.find({
    tableRef: scoreData._id
  }).limit(lengthDays).sort({timestamp: -1})
  .select({score: 1, timestamp: 1}).lean() 
  
  scoreSeriesData.forEach(item => {delete item._id})
  return {
    totalScore: scoreData.totalScore,
    scoreSeries: scoreSeriesData
  }
}

module.exports = {saveScoreCalories, saveScoreSleep, listScore}