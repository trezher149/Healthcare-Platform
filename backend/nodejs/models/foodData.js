const mongoose = require('mongoose')
const { Schema } = mongoose
const crypto = require('crypto')

const foodDataSchema = new Schema({
  _id: {
    type: String,
    default: crypto.randomBytes(4).toString('hex')
  },
  foodName: {
    type: String,
    required: true
  },
  caloriesGive: Number,
  favAmount: {
    type: Number,
    default: 0
  },
  picturePath: {
    type: String,
    default: ''
  }
})

const foodData = mongoose.model('foodData', foodDataSchema)

module.exports = foodData