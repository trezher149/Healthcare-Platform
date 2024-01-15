const mongoose = require('mongoose')
const { Schema } = mongoose

const scoreSeriesDataSchema = new Schema({
  tableRef: mongoose.Types.ObjectId,
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