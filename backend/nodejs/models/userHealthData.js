const mongoose = require('mongoose')
const { Schema } = mongoose

const userHealthDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  sex: Boolean, // false = male, true = female (Don't accuse me for being sexist because I'm not...)
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  favFoodId: [Number],
  occupationId: Number
})

const userHealthDB = mongoose.connection.useDb('userHealthData')
const userHealthData = userHealthDB.model('userHealthData', userHealthDataSchema)
module.exports = userHealthData
