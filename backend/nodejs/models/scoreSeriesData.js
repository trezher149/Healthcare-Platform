const mongoose = require('mongoose')
const { Schema } = mongoose

scoreSeriesDataSchema = new Schema({
  scoreDataSetRef: mongoose.Types.ObjectId,
  score: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
},
{
  collection: "scoreSeriesData"
})

const scoreSeriesDB = mongoose.connection.useDb('scoreData')
const scoreSeriesData = scoreSeriesDB.model('scoreSeriesData', scoreSeriesDataSchema)

module.exports = scoreSeriesData