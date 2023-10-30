const mongoose = require('mongoose')
const { Schema } = mongoose

const foodDataSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  caloriesGive: Number,
  favAmount: {
    type: Number,
    default: 0
  }
})

const foodData = mongoose.model('foodData', foodDataSchema)

module.exports = foodData