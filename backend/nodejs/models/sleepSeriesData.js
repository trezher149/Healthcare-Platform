const mongoose = require('mongoose')
const { Schema } = mongoose

sleepSerialDataSchema = new Schema({
  sleepDataSetRef: mongoose.Types.ObjectId,
  sleepDuration: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
})

const sleepSerialDB = mongoose.connection.db('calSerialData')
const sleepSerialData = sleepSerialDB.model('calSerialData', sleepSerialDataSchema)

module.exports = sleepSerialData