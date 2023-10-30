const mongoose = require('mongoose')
const { Schema } = mongoose
const sleepDataSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
})

const sleepData = mongoose.model('sleepData', sleepDataSchema)

module.exports = sleepData