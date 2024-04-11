const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { createUser, getUserData, addLineId,
  getUserIdFromLineId } = require('../controllers/user/userController')
const {createUserCaloriesData} = require('../controllers/staticData/caloriesController')
const {createUserSleepData} = require('../controllers/staticData/sleepController')
const createScoreTable = require('../controllers/staticData/scoreController')
const tokenManager = require('./tokenManager')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const mongoServerName = process.env.MONGODB_NAME
const mongodbPort = process.env.MONGODB_PORT

const mongodbURI = process.env.MONGODB_ATLAS_NAME ? process.env.MONGODB_ATLAS_NAME : 
                    `mongodb://${mongodbName}:${mongodbPasswd}@${mongoServerName}:${mongodbPort}/`

router.post('/adduser', async (req, res) => { 
  const decoded = tokenManager.tokenDecode("web-public.pem", req.body.payload)
  console.log(decoded)
  console.log(decoded.healthData)
  mongoose.connect(mongodbURI)
  createUser(decoded.email, decoded.name, decoded.password, decoded.healthData)
  .then(async (userId) => {
      return createUserCaloriesData(userId, decoded.healthData)
      .then(() => {return userId}).catch(() => {return Promise.reject(500)})
    })
  .then((userId) => { 
    return createUserSleepData(userId) })
  .then((userId) => {
    return createScoreTable(userId)
  })
  .then((userId) => {
    res.setHeader("Authorization", tokenManager.generateBearer("b2w-private.pem", {userId: userId}))
    res.send()
  })
  .catch((reject) => {
      if (typeof reject != "object") {
        return Promise.reject(reject)
      }
      res.status(406).json(reject)
    }
  ).catch((status) => {
    res.sendStatus(status)
  })
})

router.post('/addlineiduser', (req, res) => {
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", req.headers.authorization)
  mongoose.connect(mongodbURI)
  addLineId(decoded.userId, decoded.lineId)
  .then((status) => res.sendStatus(status))
  .catch((reject) => res.sendStatus(reject))
})

router.post('/showuserdata', (req, res) => {
  const decoded = tokenManager.headerTokenDecode("web-public.pem", req.headers.authorization)
  mongoose.connect(mongodbURI)
  getUserData(decoded.userId)
  .then(
    (userData) => {
      console.log(userData[0])
      console.log(userData[1])
      delete userData[1]._id
      delete userData[1].userId
      delete userData[1].__v
      console.log(userData[1])
      res.json({user:{
        id: userData[0]._id,
        name: userData[0].username,
      },
      user_data:userData[1]})
    }
  )
  .catch(
    (reject) => {res.send(reject)}
  )
})

router.post('/getuseridfromlineid', (req, res) => {
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", req.headers.authorization)
  console.log(decoded)
  mongoose.connect(mongodbURI)
  getUserIdFromLineId(decoded.lineId)
  .then((userId) => {
    const bearer = tokenManager.generateBearer("backend-private.pem", {userId: userId})
    res.setHeader("Authorization", bearer)
    res.send()
  })
  .catch((reject) => res.sendStatus(reject))
})

module.exports = router