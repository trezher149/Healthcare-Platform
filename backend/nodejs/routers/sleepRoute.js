const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { updateSleep, getSleepSeriesData } = require('../controllers/seriesData/sleepController')
const { setSleepGoal } = require('../controllers/staticData/sleepController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateSleep', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateSleep(req.body.userId, req.body.sleepDur)
  .then(scoreData => res.json(scoreData))
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/getSleep', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getSleepSeriesData(req.body.userId, req.body.lengthDays)
  .then(sleepData => res.json(sleepData))
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/setSleepGoal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  setSleepGoal(req.body.userId, req.body.sleepDays, req.body.endDays)
  .then((obj) => res.json(obj) )
  .catch((status) => res.sendStatus(status))
})

module.exports = router