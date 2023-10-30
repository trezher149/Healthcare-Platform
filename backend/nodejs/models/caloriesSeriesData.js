const mongoose = require('mongoose')
const { Schema } = mongoose

caloriesSerialDataSchema = new Schema({
  calDataSetRef: mongoose.Types.ObjectId,
  calories: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
},
{
  collection: "caloriesSerialData"
})

const caloriesSerialDB = mongoose.connection.useDb('caloriesData')
const caloriesSerialData = caloriesSerialDB.model('calSerialData', caloriesSerialDataSchema)

module.exports = caloriesSerialData