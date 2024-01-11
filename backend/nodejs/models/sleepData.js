const mongoose = require('mongoose')
const { Schema } = mongoose
const sleepDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  avgSleepTime: {
    type: Number,
    default: 0
  },
  totalSleepTime: {
    type: Number,
    default: 0
  },
  goal: {
    hasAchived: {
      type: Boolean,
      default: false
    },
    hasAchivedTime: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    sleepGoalDay: {
      type: Number,
      default: 0
    },
    setStreakGoalIntervalDay: {
      type: Number,
      default: 7
    }
  }
})

const sleepDataDB = mongoose.connection.useDb('sleepData')
const sleepData = sleepDataDB.model('sleepData', sleepDataSchema)

module.exports = sleepData