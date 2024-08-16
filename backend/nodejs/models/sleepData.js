const mongoose = require('mongoose')
const { Schema } = mongoose
const sleepDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  avgSleepTimeMinute: {
    type: Number,
    default: 0
  },
  totalSleepTimeMinute: {
    type: Number,
    default: 0
  },
})

const sleepDataDB = mongoose.connection.useDb('sleepData')
const sleepData = sleepDataDB.model('sleepData', sleepDataSchema)

module.exports = sleepData