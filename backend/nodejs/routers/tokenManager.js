const jwt = require('jsonwebtoken')
const fs = require('fs')

function tokenDecode(keyFile, token) {
  const key = fs.readFileSync(`routers/pem/${keyFile}`).toString()
  const decoded = jwt.verify(token, key, {algorithms: ['RS256']})
  return typeof(decoded) == "string" ? JSON.parse(decoded) : decoded
}

function headerTokenDecode(keyFile, token) {
  return tokenDecode(keyFile, token.split(" ")[1])
}

function generateToken(keyFile, obj) {
  const key = fs.readFileSync(`routers/pem/${keyFile}`).toString()
  return jwt.sign(obj, key, {algorithm: 'RS256'})
}

function generateBearer(keyFile, obj, customPrefix = "Bearer") {
  const token = generateToken(keyFile, obj)
  return `${customPrefix} ${token}`
}

module.exports = {tokenDecode, headerTokenDecode, generateToken, generateBearer}