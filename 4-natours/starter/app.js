const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

const port = 3000
app.listen(port, () => {
  console.log(`Listening to ${port} port...`)
})
