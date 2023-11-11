const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {updateCalories, getCaloriesData} = require('../controllers/serialData/caloriesController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/updateCal', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  updateCalories(req.body.calories, req.body.userId)
  .then((resolve) => {
    res.status(200).send(resolve)
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

module.exports = router