const mongoose = require('mongoose')
const scoreDataModel = require('../../models/scoreData')
const scoreSeriesDataModel = require('../../models/scoreSeriesData')

const achivedTimeLimit = 5
const sleepPunish = 300

async function saveScore(userId, realScore) {
  var scoreData = await scoreDataModel.findOne({userId: userId})
  if (scoreData == null) {
    scoreData = new scoreDataModel({
      userId: userId
    })
  }
  console.log(scoreData)
  console.log("Checking scoreSeriesData...")
  var scoreSerialData = await scoreSeriesDataModel.find({ userId: userId })
                        .sort({ timestamp: -1 }).limit(1).exec()
  if (scoreSerialData[0] == null) {
    console.log("Creating a new one...")
    await scoreSeriesDataModel.create({
      scoreDataSetRef: scoreData._id,
      score: realScore
    })
  }
  else {
    await scoreSeriesDataModel.create({
      scoreDataSetRef: scoreData._id,
      score: realScore
    })
  }
  scoreData.totalScore += realScore
  console.log("Saving score...")
  await scoreData.save()
}

async function updateScoreCal(userId, calories, bmr, caloriesGoal, hasAchivedTime) {
  const baseScore = 100
  const achiveScore = 200
  var realScore = 0
  console.log("Calculating...")
  const sedentary = Math.round(bmr * 0.2)
  const light = Math.round(bmr * 0.375)
  const moderate = Math.round(bmr * 0.55)
  const active = Math.round(bmr * 0.725)
  const extream = Math.round(bmr * 0.9)
  if (calories <= sedentary) {
    realScore = Math.round(calories / sedentary * baseScore) 
  }
  else {
    realScore = baseScore + Math.round(calories * 0.2)
    if (calories >= light) {
      realScore = realScore
    }
  }
  if (caloriesGoal > 0) {
    if (hasAchivedTime > achivedTimeLimit) {
      realScore += achiveScore * 0.25
    }
    else {
      realScore += achiveScore
    }
  }
  return saveScore(userId, realScore)
  .then(() => {return realScore})
}

async function updateScoreSleep(userId, sleepDuration, streak, streakGoal, hasAchived) {
  const baseScore = 400
  const streakScore = baseScore * 2
  var realScore = 0
  if (sleepDuration < 740) {
    realScore = (baseScore - sleepPunish) * Math.round(sleepDuration / 760)
  }
  else if (sleepDuration > 820) {
    realScore = (baseScore - sleepPunish) * Math.round(800 / sleepDuration)
  }
  else {
    realScore = baseScore
    if (streakGoal > 0) {
      if (streak == streakGoal) {
        realScore += streakScore
      } 
    }
  }
  return await saveScore(userId, realScore)
}

module.exports = { updateScoreCal, updateScoreSleep}