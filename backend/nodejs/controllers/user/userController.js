const userModel = require('../../models/user')
const userHealthData = require('../../models/userHealthData')
const lineModel = require('../../models/lineUser')

async function createUser(email, name, password, healthData){
  var checkExist = [false, false] //[email, username]
  await userModel.findOne({username: name})
  .then((result) => {checkExist[1] = (result != null) ? true:false})
  await userModel.findOne({email: email})
  .then((result) => {checkExist[0] = (result != null) ? true:false})
  if (checkExist[0] || checkExist[1] ){
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
}

async function addLineId(userId, lineId) {
  if (await lineModel.findOne({userId: userId})) {
    console.log('Rejected')
    return Promise.reject(400)
  }
  console.log('Creating...')
  var user = await userModel.findById(userId)
  user.is_line_user = true
  return lineModel.create({
    userId: userId,
    lineId, lineId
  }).then(user.save())
  .then(() => {return 200})
}

async function getUserData(userId) {
  const user = await userModel.findOne({_id: userId}).lean()
  const userHealth = await userHealthData.findOne({userId: userId}).lean()
  return Promise.resolve([user, userHealth])
}

async function getUserIdFromLineId(lineId) {
  const user = await lineModel.findOne({lineId: lineId})
  if (user) {
    console.log(user.userId)
    return Promise.resolve(user.userId)
  }
  else {
    return Promise.reject(400)
  }
}

module.exports = { createUser, getUserData, addLineId, getUserIdFromLineId}