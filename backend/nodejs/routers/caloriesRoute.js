const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {updateCalories, getCaloriesData,
      setCaloriesGoal} = require('../controllers/serialData/caloriesController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateCalories(req.body.calories, req.body.userId)
  .then((score) => {
    res.status(200).json({score: score})
  })
  .catch((reject) => {
    res.status(500).send(reject)
  })
})

router.post('/getCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getCaloriesData(req.body.userId)
  .then(
    (data) => {
      res.send(data)
    }
  )
})

router.post('/setCalGoal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  setCaloriesGoal(req.body.userId, req.body.caloriesGoal)
  .then((msg) => {res.send(msg)})
  .catch((msg) => {res.status(403).send(msg)})
})

module.exports = router