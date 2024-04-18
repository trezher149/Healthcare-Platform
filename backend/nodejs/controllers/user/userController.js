const userModel = require('../../models/user')
const userHealthData = require('../../models/userHealthData')
const lineModel = require('../../models/lineUser')

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
  const newUser = new userModel({
    email: email,
    username: name,
    password: password
  })
  console.log(newUser._id)
  return newUser.save()
  .then(async () => {
    await userHealthData.create({
      userId: newUser._id,
      sex: healthData.sex,
      age: healthData.age,
      height: healthData.height,
      weight: healthData.weight,
    })
    return newUser._id
  })
  .catch((e) => {
    console.log(e)
    return Promise.reject(500)
  })
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

module.exports = { createUser, getUserData, addLineId, getUserIdFromLineId}