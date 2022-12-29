const express = require('express')
const app = express()
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.use((req, res, next) => {
  req.reqTimes = new Date().toISOString()
  next()
})

module.exports = app
