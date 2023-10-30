const mongoose = require('mongoose')
const { Schema } = mongoose

scoreSerialDataSchema = new Schema({
  scoreDataSetRef: mongoose.Types.ObjectId,
  score: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
})

const scoreSerialDB = mongoose.connection.db('calSerialData')
const scoreSerialData = scoreSerialDB.model('calSerialData', scoreSerialDataSchema)

module.exports = scoreSerialData