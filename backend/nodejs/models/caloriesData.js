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
  caloriesGoal: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  hasAchivedTime: {
    type: Number,
    default: 0
  },
  goalSetTime: {
    type: Date
  }
},
{
  timestamps: true
}
)


const caloriesDataDB = mongoose.connection.useDb('caloriesData')
const caloriesData = caloriesDataDB.model('caloriesData', caloriesDataSchema)

module.exports = caloriesData