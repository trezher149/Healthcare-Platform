const mongoose = require('mongoose')
const { Schema } = mongoose
const sleepDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  streak: {
    type: Number,
    default: 0
  },
  streakGoal: {
    type: Number,
    default: 0
  },
  hasAchived: {
    type: Boolean,
    default: false
  }
})

const sleepDataDB = mongoose.connection.useDb('sleepData')
const sleepData = sleepDataDB.model('sleepData', sleepDataSchema)

module.exports = sleepData