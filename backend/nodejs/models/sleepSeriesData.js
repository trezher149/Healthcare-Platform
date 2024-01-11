const mongoose = require('mongoose')
const { Schema } = mongoose

const sleepSeriesDataSchema = new Schema({
  sleepDataSetRef: mongoose.Types.ObjectId,
  sleepDuration: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
},
{
  collection: "sleepSerialData"
})

const sleepSeriesDB = mongoose.connection.useDb('sleepData')
const sleepSeriesData = sleepSeriesDB.model('sleepSeriesData', sleepSeriesDataSchema)

module.exports = sleepSeriesData