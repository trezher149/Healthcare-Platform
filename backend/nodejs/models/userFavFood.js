const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose

const userFavFoodSchema = new Schema({
  _id: {
    type: String,
    default: crypto.randomBytes(6).toString('hex')
  },
  favFood: {
    type: String,
    required: true
  },
})

const userDB = mongoose.connection.useDb('userData')
const userFavFood = userDB.model('userFavFood', userFavFoodSchema)

module.exports = userFavFood