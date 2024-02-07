const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { createUser, getUserData, addLineId,
  getUserIdFromLineId } = require('../controllers/user/userController')
const {createUserCaloriesData} = require('../controllers/staticData/caloriesController')
const {createUserSleepData} = require('../controllers/staticData/sleepController')
const createScoreTable = require('../controllers/staticData/scoreController')
const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/adduser', async (req, res) => { 
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  createUser(req.body.email, req.body.name, req.body.password, req.body.healthData)
  .then(async (userId) => {
      return createUserCaloriesData(userId, req.body.healthData)
      .then(() => {return userId}).catch(() => {return Promise.reject(500)})
    }
  ).then((userId) => {
    return createUserSleepData(userId)
  })
  .then((userId) => {
    console.log(userId)
    return createScoreTable(userId)
  })
  .then((userId) => { res.json({userId: userId}) })
  .catch((reject) => {
      if (typeof reject != "object") {
        return Promise.reject(reject)
      }
      let errMsg = {err_email:"",err_name:""}
      if (reject[0]) {
        errMsg.err_email = "อีเมลนี้ถูกใช้งานแล้ว"
      }
      if (reject[1]) {
        errMsg.err_name = "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว"
      }
      res.status(406).json(errMsg)
    }
  ).catch((status) => {
    res.sendStatus(status)
  })
})

router.post('/addlineiduser', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  addLineId(req.body.userId, req.body.lineId)
  .then((status) => res.sendStatus(status))
  .catch((reject) => res.sendStatus(reject))
})

router.post('/showuserdata', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getUserData(req.body.userId)
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
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getUserIdFromLineId(req.body.lineId)
  .then((userId) => res.json({userId: userId}))
  .catch((reject) => res.sendStatus(reject))
})

module.exports = router