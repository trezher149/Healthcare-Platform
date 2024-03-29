const mongoose = require('mongoose')
const { Schema } = mongoose

const sleepSeriesDataSchema = new Schema({
  tableRef: mongoose.Types.ObjectId,
  sleepDuration: Number,
  timestamp: {
    type: Date,
    default: () => new Date()
  }
},
{
  collection: "sleepSerialData"
})

const sleepSeriesDB = mongoose.connection.useDb('sleepData')
const sleepSeriesData = sleepSeriesDB.model('sleepSeriesData', sleepSeriesDataSchema)

module.exports = sleepSeriesData