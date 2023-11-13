const mongoose = require('mongoose')
const { Schema } = mongoose

sleepSerialDataSchema = new Schema({
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

const sleepSerialDB = mongoose.connection.useDb('sleepData')
const sleepSerialData = sleepSerialDB.model('sleepSerialData', sleepSerialDataSchema)

module.exports = sleepSerialData