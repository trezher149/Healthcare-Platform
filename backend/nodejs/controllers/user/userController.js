const userModel = require('../../models/user')
const userHealthData = require('../../models/userHealthData')
const lineModel = require('../../models/lineUser')
const bcrypt = require('bcrypt')

const {getCaloriesSeriesData} = require('../../controllers/seriesData/caloriesController')
const {getSleepSeriesData} = require('../../controllers/seriesData/sleepController')
const {listScore} = require('../../controllers/seriesData/scoreController')

async function createUser(email, name, password, healthData){
  const checkExist = {
    foundSameUsername: false,
    foundSameEmail: false
  }
  await userModel.findOne({username: name})
  .then((result) => {checkExist.foundSameUsername = (result != null) ? true:false})
  await userModel.findOne({email: email})
  .then((result) => {checkExist.foundSameEmail = (result != null) ? true:false})
  if (checkExist.foundSameUsername || checkExist.foundSameEmail ){
      return Promise.reject(checkExist)
  }
  const salt = bcrypt.genSaltSync()
  const newUser = new userModel({
    email: email,
    username: name,
    password: bcrypt.hashSync(password, salt)
  })
  await newUser.save()
  await userHealthData.create({
    userId: newUser._id,
    sex: healthData.sex,
    age: healthData.age,
    height: healthData.height,
    weight: healthData.weight,
  })
  console.log(newUser._id)
  return newUser._id
}

async function addLineId(userId, lineId) {
  if (await lineModel.findOne({userId: userId}) != null) {
    console.log('Rejected')
    return Promise.reject(406)
  }
  const user = await userModel.findById(userId)
  if (user == null) {
    return Promise.reject(404)
  }
  user.is_line_user = true
  return lineModel.create({
    userId: userId,
    lineId: lineId
  }).then(user.save())
  .then(() => {return 200})
}

async function loginUser(name, password) {
  const user = await userModel.findOne({username: name})
                .select({_id: 1, password: 1}).lean()
  if (bcrypt.compareSync(password, user.password)) {
    return user._id
  } else {return Promise.reject()}
  
}

async function getUserData(userId) {
  const user = userModel.findOne({_id: userId}).lean()
  const userHealth = userHealthData.findOne({userId: userId}).lean()
  return Promise.resolve([await user.lean(), await userHealth.lean()])
}

async function getUserIdFromLineId(lineId) {
  const user = await lineModel.findOne({lineId: lineId})
  if (user) {
    console.log(user.userId)
    return Promise.resolve(user.userId)
  }
  else {
    return Promise.reject(404)
  }
}

async function getRecentData(userId) {
  const today = new Date()
  var date = undefined
  var diffDays = 0
  var result = {}
  const recentCal = (await getCaloriesSeriesData(userId, 1))[0]
  date = recentCal.timestamp
  diffDays = (today - date) / (1000 * 3600 * 24)
  if (diffDays < 10 && today.getDate() == date.getDate()) {
    delete recentCal.timestamp
    result = {...result, ...recentCal}
  }
  const recentSleep = (await getSleepSeriesData(userId, 1))[0]
  date = recentSleep.timestamp
  diffDays = (today - date) / (1000 * 3600 * 24)
  if (diffDays < 10 && today.getDate() == date.getDate()) {
    delete recentSleep.timestamp
    result = {...result, ...recentSleep}
  }
  const recentScore = (await listScore(userId, 1)).scoreSeries[0]
  date = recentScore.timestamp
  diffDays = (today - date) / (1000 * 3600 * 24)
  if (diffDays < 10 && today.getDate() == date.getDate()) {
    delete recentScore.timestamp
    result = {...result, ...recentScore}
  }
  return result
}


module.exports = { createUser, getUserData, addLineId, getUserIdFromLineId, getRecentData, loginUser}