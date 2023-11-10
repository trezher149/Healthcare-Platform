const express = require('express')
const body_parser = require('body-parser')
const userRoute = require('./routers/userRoute')
const caloriesRoute = require('./routers/caloriesRoute')
const foodRoute = require('./routers/foodRoute')

const app = express()

app.use(body_parser.json())
app.use('/api/user', userRoute)
app.use('/api/calories', caloriesRoute)
app.use('/apu/food', foodRoute)

app.listen(14000, () => {
  console.log("The server is running on port 14000")
})