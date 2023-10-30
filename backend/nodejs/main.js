const express = require('express')
const body_parser = require('body-parser')
const userRoute = require('./routers/userRoute')

const app = express()

app.use(body_parser.json())
app.use('/api/user', userRoute)

app.listen(14000, () => {
  console.log("The server is running on port 14000")
})