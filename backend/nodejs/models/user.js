const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => crypto.randomBytes(4).toString('hex')
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  is_line_user: {
    type: Boolean,
    default: false
  }
})

const userDB = mongoose.connection.useDb('userData')
const user = userDB.model('user', userSchema)

module.exports = user