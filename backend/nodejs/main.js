const express = require('express')
const body_parser = require('body-parser')
const userRoute = require('./routers/userRoute')
const caloriesRoute = require('./routers/caloriesRoute')
const foodRoute = require('./routers/foodRoute')
const sleepRoute = require('./routers/sleepRoute')
const cors = require('cors')

const app = express()

app.use(body_parser.json())
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use('/api/user', userRoute)
app.use('/api/calories', caloriesRoute)
app.use('/api/food', foodRoute)
app.use('/api/sleep', sleepRoute)

app.listen(14000, () => {
  console.log("The server is running on port 14000")
})