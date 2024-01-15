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
    streakGoalDay: {
      type: Number,
      default: 0
    },
    setStreakGoalTime: {
      type: Date
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