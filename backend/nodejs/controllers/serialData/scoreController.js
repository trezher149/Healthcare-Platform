const mongoose = require('mongoose')
const scoreDataModel = require('../../models/scoreData')
const scoreSerialDataModel = require('../../models/scoreSerialData')
const scoreData = require('../../models/scoreData')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

const achivedTimeLimit = 5
const sleepPunish = 300

async function saveScore(userId, scoreData) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  var scoreData = await scoreDataModel.findOne({userId: userId})
  if (scoreData == null) {
    scoreData = new scoreDataModel({
      userId: userId
    })
  }
  console.log("Checking scoreSerialData...")
  var scoreSerialData = await scoreSerialDataModel.find({ userId: userId })
                        .sort({ timestamp: -1 }).limit(1).exec()
  if (scoreSerialData[0] == null) {
    console.log("Creating a new one...")
    await scoreSerialDataModel.create({
      scoreDataSetRef: scoreData._id,
      score: realScore
    })
  }
  else {
    await scoreSerialDataModel.create({
      scoreDataSetRef: scoreData._id,
      score: realScore
    })
  }
  scoreData.totalScore += realScore
  console.log("Saving...")
  await scoreData.save()
}

async function updateScoreCal(userId, calories, bmr, caloriesGoal, hasAchivedTime) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const baseScore = 100
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
      realScore = Math.round(realScore * 1.05)
    }
    else {
      realScore = Math.round(realScore * 1.15)
    }
  }
  return saveScore(userId, realScore)
        .then(() => {return "Saving calories complete!"})
}

async function updateScoreSleep(userId, sleepDuration, streak, streakGoal, hasAchived) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  const baseScore = 400
  var realScore = 0
  if (sleepDuration < 740) {
    realScore = (baseScore - sleepPunish) * Math.round(sleepDuration / 760)
  }
  else if (sleepDuration > 820) {
    realScore = (baseScore - sleepPunish) * Math.round(800 / sleepDuration)
  }
  else {
    realScore = baseScore
  }
  return saveScore(userOd, realScore)
}

module.exports = { updateScoreCal, updateScoreSleep}