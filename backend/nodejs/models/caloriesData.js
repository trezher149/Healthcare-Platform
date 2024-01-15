const mongoose = require('mongoose')
const { Schema } = mongoose

const caloriesDataSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bmr: {
    type: Number,
    required: true
  },
  caloriesTotal: {
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
    caloriesGoal: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    streakGoal: {
      type: Number,
      default: 7
    },
    setCaloriesGoalTime: {
      type: Date
    },
    setCaloriesGoalIntervalDay: {
      type: Number,
      default: 7
    },
    setStreakGoalTime: {
      type: Date
    },
    setStreakGoalIntervalDay: {
      type: Number,
      default: 7
    }
  }
},
{
  timestamps: true
}
)


const caloriesDataDB = mongoose.connection.useDb('caloriesData')
const caloriesData = caloriesDataDB.model('caloriesData', caloriesDataSchema)

module.exports = caloriesData