const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { updateSleep, getSleepData } = require('../controllers/serialData/sleepController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateSleep', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateSleep(req.body.userId, req.body.sleepDur)
  .then((score) => res.json({score: score}))
  .catch((reject) => res.sendStatus(500))
})

router.post('/getSleep', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getSleepData(req.body.userId)
  .then(
    (series) => {
      res.json({
        userId: "userId",
        series: series
      })
    }
  )
})

module.exports = router