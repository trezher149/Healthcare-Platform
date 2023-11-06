const mongoose = require('mongoose')
const { Schema } = mongoose
const sleepDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  sleepWellCount: {
    type: Number,
    required: true
  }
})

const sleepDataDB = mongoose.connection.db('sleepData')
const sleepData = sleepDataDB.model('sleepData', sleepDataSchema)

module.exports = sleepData