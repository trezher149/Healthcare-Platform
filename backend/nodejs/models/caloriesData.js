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
  caloriesTotal: {
    type: Number,
    default: 0
  },
  caloriesSerialData: {
    type: [caloriesSerialDataSchema],
    default: []
  },
},
{
  timestamps: true
}
)


const caloriesData = mongoose.model('caloriesData', caloriesDataSchema)

module.exports = caloriesData