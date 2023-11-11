const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { getFoodList, getAllFoodList, addFood } = require('../controllers/foodListController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/getFoodList', (req, res) => {
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  getFoodList(req.body.calories, req.body.foodIds)
  .then((result) => {
    res.json({"foodList": result})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send("Error!")
  })
})

module.exports = router