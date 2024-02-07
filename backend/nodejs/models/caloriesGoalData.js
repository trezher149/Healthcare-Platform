const mongoose = require('mongoose')
const { Schema } = mongoose

const caloriesGoalDataSchema = new Schema({
  tableRef: {
    type: String,
    required: true,
  },
  isAchived: {
    type: Boolean,
    default: false
  },
  caloriesTotal: {
    type: Number,
    default: 0
  },
  caloriesGoal: {
    type: Number,
    required: true 
  },
  scoreToGet: {
    type: Number,
    default: 0
  },
  endGoalTime: {
    type: Date,
    required: true
  },
  setCaloriesGoalTime: {
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


const caloriesGoalDataDB = mongoose.connection.useDb('caloriesData')
const caloriesGoalData = caloriesGoalDataDB.model('caloriesData', caloriesGoalDataSchema)

module.exports = caloriesGoalData