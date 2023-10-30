const mongoose = require('mongoose')
const { Schema } = mongoose
const scoreSeriesDataSchema = new Schema({
  score: Number
},
{
  timestamps: true
}
)
const scoreDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    default: 0
  },
  scoreSeires: [scoreSeiresDataSchema],
},
{
  timestamps: true
}
)

const sleepData = mongoose.model('sleepData', sleepDataSchema)

module.exports = sleepData