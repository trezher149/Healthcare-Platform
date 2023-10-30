const mongoose = require('mongoose')
const user = require('../../models/user')
const userHealthData = require('../../models/userHealthData')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME


async function addUser(email, name, password, healthData){
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  let checkExist = [false, false] //[email, username]
  await user.findOne({username: name})
  .then((result) => {checkExist[1] = (result != null) ? true:false})
  await user.findOne({email: email})
  .then((result) => {checkExist[0] = (result != null) ? true:false})
  if (checkExist[0] || checkExist[1] ){
      return Promise.reject(checkExist)
  }
  const newUser = new user({
    email: email,
    username: name,
    password: password
  })
  newUser.save()
  .then(async () => {
    await userHealthData.create({
      userId: newUser._id,
      sex: healthData.sex,
      height: healthData.height,
      weight: healthData.weight,
      favFoodId: healthData.favFood,
      occupationId: healthData.occupation
    })
  }
  )
  return Promise.resolve(true)
}

async function getUserData(userId) {
  await mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  var currUser = undefined
  return user.findOne({_id: userId})
  .then((user) => {
    currUser = user
    userHealthData.findOne({userId: userId})
    .then((currUserData) => {
      console.log(currUserData)
      return Promise.resolve([currUser, currUserData])
    })
  })
}

module.exports = { addUser, getUserData, }