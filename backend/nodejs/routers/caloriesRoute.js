const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {updateCalories, getCaloriesSeriesData} = require('../controllers/seriesData/caloriesController')
const {setCaloriesGoal} = require('../controllers/staticData/caloriesController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateCalories(req.body.userId, req.body.calories)
  .then(scoreData => res.json(scoreData))
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/getCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getCaloriesSeriesData(req.body.userId, req.body.lenghtDays)
  .then(data => res.json(data))
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/setCalGoal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  setCaloriesGoal(req.body.userId, req.body.caloriesGoal, req.body.endDays)
  .then((obj) => {res.json(obj)})
  .catch((status) => {res.sendStatus(status)})
})

module.exports = router