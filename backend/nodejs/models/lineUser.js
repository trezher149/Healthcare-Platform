const mongoose = require('mongoose')
const { Schema } = mongoose

const lineUserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  lineId: {
    type: String,
    required: true
  }
})

const lineUserDB = mongoose.connection.useDb('lineUser')
const lineUser = lineUserDB.model('lineUser', lineUserSchema)
module.exports = lineUser

