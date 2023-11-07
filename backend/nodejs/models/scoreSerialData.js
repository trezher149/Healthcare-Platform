const mongoose = require('mongoose')
const { Schema } = mongoose

scoreSerialDataSchema = new Schema({
  scoreDataSetRef: mongoose.Types.ObjectId,
  score: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
},
{
  collection: "scoreSerialData"
})

const scoreSerialDB = mongoose.connection.useDb('scoreData')
const scoreSerialData = scoreSerialDB.model('scoreSerialData', scoreSerialDataSchema)

module.exports = scoreSerialData