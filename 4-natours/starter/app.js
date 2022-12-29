const fs = require('fs')
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
  req.reqTimes = new Date().toISOString()
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  console.log(req.reqTimes)
  res.status(200).json({
    status: 'success',
    reqetAt: req.reqTimes,
    length: tours.length,
    data: { tours },
  })
}

const getTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)
  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: 'we could not find any data' })

  return res.status(200).json({ status: 'success', data: { tour } })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err, data) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}

const updateTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)

  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: 'we could not find any data' })

  return res.status(200).json({ status: 'success', data: '<Updated Tour>' })
}

const deleteTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)

  if (!tour) return res.status(204).json({ status: 'fail', message: null })

  return res.status(200).json({ status: 'success', data: '<Deleted Tour>' })
}

const getAllUsers = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'not implemented yet!' })
}
const createUser = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'not implemented yet!' })
}
const getUser = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'not implemented yet!' })
}
const updateUser = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'not implemented yet!' })
}
const deleteUser = (req, res) => {
  res.status(500).json({ status: 'fail', message: 'not implemented yet!' })
}

const tourRouter = express.Router()
const userRouter = express.Router()

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

const port = 3000
app.listen(port, () => {
  console.log(`Listening to ${port} port...`)
})
