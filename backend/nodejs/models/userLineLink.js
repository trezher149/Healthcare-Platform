const mongoose = require('mongoose')
const { Schema } = mongoose

const userLineLinkSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  lineId: {
    type: String,
    required: true
  }
})

const userLineLinkDB = mongoose.connection.useDb('userLineLink')
const userLineLink = userLineLinkDB.model('userLineLink', userLineLinkSchema)
module.exports = userLineLink

