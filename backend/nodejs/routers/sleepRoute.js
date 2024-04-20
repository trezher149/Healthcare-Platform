const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { updateSleep, getSleepSeriesData } = require('../controllers/seriesData/sleepController')
const { setSleepGoal } = require('../controllers/staticData/sleepController')
const tokenManager = require('./tokenManager')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const mongoServerName = process.env.MONGODB_NAME
const mongodbPort = process.env.MONGODB_PORT

const mongodbURI = process.env.MONGODB_ATLAS_NAME ? process.env.MONGODB_ATLAS_NAME : 
                    `mongodb://${mongodbName}:${mongodbPasswd}@${mongoServerName}:${mongodbPort}/`

router.post('/updateSleep', (req, res) => {
  const auth_header = req.headers.authorization
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", auth_header)
  mongoose.connect(mongodbURI)
  updateSleep(decoded.userId, req.body.sleepDur)
  .then((scoreData) => {
    const encoded = tokenManager.generateToken("backend-private.pem", scoreData)
    res.json({payload: encoded})
  })
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/getSleep', (req, res) => {
  const auth_header = req.headers.authorization
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", auth_header)
  mongoose.connect(mongodbURI)
  getSleepSeriesData(decoded.userId, req.body.lengthDays)
  .then((data) => {
    const encoded = tokenManager.generateToken("backend-private.pem", {data})
    res.json({payload: encoded})
  })
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/setSleepGoal', (req, res) => {
  const auth_header = req.headers.authorization
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", auth_header)
  mongoose.connect(mongodbURI)
  setSleepGoal(decoded.userId, req.body.sleepDays, req.body.endDays)
  .then((goalData) => {
    const encoded = tokenManager.generateToken("backend-private.pem", goalData)
    res.json({payload:encoded})
  } )
  .catch((status) => res.sendStatus(status))
})

module.exports = router