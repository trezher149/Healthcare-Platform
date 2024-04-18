const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {listScore} = require('../controllers/seriesData/scoreController')
const tokenManager = require('./tokenManager')

const mongodbName = process.env.MONGODB_ADMINUSERNAME
const mongodbPasswd = process.env.MONGODB_ADMINPASSWD
const mongoServerName = process.env.MONGODB_NAME
const mongodbPort = process.env.MONGODB_PORT

const mongodbURI = process.env.MONGODB_ATLAS_NAME ? process.env.MONGODB_ATLAS_NAME : 
                    `mongodb://${mongodbName}:${mongodbPasswd}@${mongoServerName}:${mongodbPort}/`

router.post('/getScore', (req, res) => {
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
  listScore(decoded.userId, req.body.lenghtDays)
  .then((data) => {
    console.log(data)
    const privt_key = fromLineBot ? "backend-private.pem" : "b2w-private.pem"
    const encoded = tokenManager.generateToken(privt_key, data)
    console.log(encoded)
    res.send({payload: encoded})
  })
  .catch(errCode => res.sendStatus(errCode))
})

module.exports = router