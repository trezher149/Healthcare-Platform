const mongoose = require('mongoose')
const { Schema } = mongoose
const scoreDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    default: 0
  },
},
{
  timestamps: true
}
)

const scoreDataDB = mongoose.connection.useDb('scoreData')
const scoreData = scoreDataDB.model('scoreData', scoreDataSchema)

module.exports = scoreData