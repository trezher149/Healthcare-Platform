const mongoose = require('mongoose')
const { Schema } = mongoose

caloriesSeriesDataSchema = new Schema({
  tableRef: mongoose.Types.ObjectId,
  calories: Number,
  timestamp: {
    type: Date,
    default: () => Date.now()
  }
},
{
  collection: "caloriesSeriesData"
})

const caloriesSeriesDB = mongoose.connection.useDb('caloriesData')
const caloriesSeriesData = caloriesSeriesDB.model('calSeriesData', caloriesSeriesDataSchema)

module.exports = caloriesSeriesData