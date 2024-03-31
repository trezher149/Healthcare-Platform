const express = require('express')
const body_parser = require('body-parser')
require('events').EventEmitter.setMaxListeners(15)
const userRoute = require('./routers/userRoute')
const caloriesRoute = require('./routers/caloriesRoute')
const foodRoute = require('./routers/foodRoute')
const sleepRoute = require('./routers/sleepRoute')

const port = process.env.PORT
const frontendURL = process.env.FRONTEND_URL
const frontendPort = process.env.FRONTEND_PORT

const cors = require('cors')

const app = express()

app.use(body_parser.json())
app.use(cors({
  origin: [`${frontendURL}:${frontendPort}`]
}))
app.use('/api/user', userRoute)
app.use('/api/calories', caloriesRoute)
app.use('/api/food', foodRoute)
app.use('/api/sleep', sleepRoute)

app.listen(port, () => {
  console.log("The server is running on port 14000")
})