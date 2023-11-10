const mongoose = require('mongoose')
const { Schema } = mongoose

const caloriesSerialDataSchema = new Schema({
  calories: Number,
},
{
  timestamps: true
}
)

const caloriesDataSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bmr: {
    type: Number,
    required: true
  },
  streak: {
    type: Number,
    default: 0
  },
  caloriesGoal: {
    type: Number,
    default: 0
  },
  hasAchivedTime: {
    type: Number,
    default: 0
  },
  caloriesTotal: {
    type: Number,
    default: 0
  },
},
{
  timestamps: true
}
)


const caloriesDataDB = mongoose.connection.useDb('caloriesData')
const caloriesData = caloriesDataDB.model('caloriesData', caloriesDataSchema)

module.exports = caloriesData