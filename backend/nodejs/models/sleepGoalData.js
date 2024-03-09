const mongoose = require('mongoose')
const { Schema } = mongoose

const sleepGoalDataSchema = new Schema({
  tableRef: {
    type: String,
    required: true,
  },
  isAchived: {
    type: Boolean,
    default: false
  },
  sleepStreakTotal: {
    type: Number,
    default: 0
  },
  streakGoal: {
    type: Number,
    required: true 
  },
  scoreToGet:{
    type: Number,
    default: 0 
  },
  setSleepGoalTime: {
    type: Date,
    default: () => Date.now()
  },
  setGoalIntervalDays: {
    type: Number,
    default: 7
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isRenew: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
}
)


const sleepGoalDataDB = mongoose.connection.useDb('sleepData')
const sleepGoalData = sleepGoalDataDB.model('sleepData', sleepGoalDataSchema)

module.exports = sleepGoalData