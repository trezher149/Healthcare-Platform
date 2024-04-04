const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {updateCalories, getCaloriesSeriesData} = require('../controllers/seriesData/caloriesController')
const {setCaloriesGoal} = require('../controllers/staticData/caloriesController')
const tokenManager = require('./tokenManager')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const mongoServerName = process.env.MONGODB_NAME
const mongodbPort = process.env.MONGODB_PORT

const mongodbURI = process.env.MONGODB_ATLAS_NAME ? process.env.MONGODB_ATLAS_NAME : 
                    `mongodb://${mongodbName}:${mongodbPasswd}@${mongoServerName}:${mongodbPort}/`

router.post('/updateCal', (req, res) => {
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", req.headers.authorization)
  mongoose.connect(mongodbURI)
  updateCalories(decoded.userId, req.body.calories)
  .then((scoreData) => {
    const encoded = tokenManager.generateToken("backend-private.pem", scoreData)
    console.log(encoded)
    res.json({payload: encoded})
  })
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/getCal', (req, res) => {
  var fromLineBot = true
  const auth_header = req.headers.authorization
  try {
    var decoded = tokenManager.headerTokenDecode("linebot-public.pem", auth_header)
    console.log("nice")
  } catch(err) {
    var decoded = tokenManager.headerTokenDecode("web-public.pem", auth_header)
    fromLineBot = false
  }
  console.log(decoded)
  mongoose.connect(mongodbURI)
  getCaloriesSeriesData(decoded.userId, req.body.lenghtDays)
  .then((data) => {
    const privt_key = fromLineBot ? "backend-private.pem" : "b2w-private.pem"
    console.log({data})
    const encoded = tokenManager.generateToken(privt_key, {data})
    res.send({payload: encoded})
  })
  .catch(errCode => res.sendStatus(errCode))
})

router.post('/setCalGoal', (req, res) => {
  const decoded = tokenManager.headerTokenDecode("linebot-public.pem", req.headers.authorization)
  mongoose.connect(mongodbURI)
  setCaloriesGoal(decoded.userId, req.body.caloriesGoal, req.body.endDays)
  .then(goalData => res.json(goalData))
  .catch((status) => {res.sendStatus(status)})
})

module.exports = router