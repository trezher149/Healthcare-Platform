const mongoose = require('mongoose')
const { Schema } = mongoose

caloriesSerialDataSchema = new Schema({
  calDataSetRef: mongoose.Types.ObjectId,
  calories: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
})

const caloriesSerialDB = mongoose.connection.db('calSerialData')
const caloriesSerialData = caloriesSerialDB.model('calSerialData', caloriesSerialDataSchema)

module.exports = caloriesSerialData