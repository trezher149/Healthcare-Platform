const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {updateCalories, getCaloriesData} = require('../controllers/seriesData/caloriesController')
const {setCaloriesGoal} = require('../controllers/staticData/caloriesController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateCalories(req.body.userId, req.body.calories)
  .then((scoreObj) => {
    res.status(200).json(scoreObj)
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
  setCaloriesGoal(req.body.userId, req.body.caloriesGoal, req.body.endDays)
  .then((obj) => {res.json(obj)})
  .catch((status) => {res.sendStatus(status)})
})

module.exports = router