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
},
{
  timestamps: true
}
)


const caloriesDataDB = mongoose.connection.useDb('caloriesData')
const caloriesData = caloriesDataDB.model('caloriesData', caloriesDataSchema)

module.exports = caloriesData