const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { addUser, getUserData } = require('../controllers/user/userController')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const dbName = process.env.MONGODB_NAME

router.post('/adduser', async (req, res) => { 
  mongoose.connect(`mongodb://${mongodbName}:${mongodbPasswd}@${dbName}:27017/`)
  addUser(req.body.email, req.body.name, req.body.password, req.body.healthData)
  .then((status) => {
      res.json({data_sts:status})
    }
  ).catch((reject) => {
      let errMsg = {err_email:"",err_name:""}
      if (reject[0]) {
        errMsg.err_email = "อีเมลนี้ถูกใช้งานแล้ว"
      }
      if (reject[1]) {
        errMsg.err_name = "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว"
      }
      res.status(406).json(errMsg)
    }
  ).catch((err) => {
    res.json({err_msg: err})
  })
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

module.exports = router