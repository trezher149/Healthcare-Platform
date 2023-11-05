const mongoose = require('mongoose')
const { Schema } = mongoose

const userHealthDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  sex: {
    type: Boolean,
    required: true // false = male, true = female (Don't accuse me for being sexist because I'm not...)
  },
  age: {
    type: Number,
    required: true
  },
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
}, {
  collection: "userHealthData"
})

const userHealthDB = mongoose.connection.useDb('userData')
const userHealthData = userHealthDB.model('userHealthData', userHealthDataSchema)
module.exports = userHealthData
