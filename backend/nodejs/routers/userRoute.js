const express = require('express')
const router = express.Router()
const { addUser, getUserData } = require('../controllers/user/userController')

router.post('/adduser', async (req, res) => { 
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
  getUserData(req.body.userId)
  .then(
    (userData) => {
      console.log(typeof(userData))
      console.log(userData[0])
      console.log(userData[1])
      userData[0].pop("_id")
      userData[1].pop("_id")
      res.json({user:userData[0], user_data:userData[1]})
    }
  )
  .catch(
    (reject) => {res.send(reject)}
  )
})

module.exports = router