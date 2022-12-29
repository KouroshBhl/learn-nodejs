const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.getAllTours = (req, res) => {
  console.log(req.reqTimes)
  res.status(200).json({
    status: 'success',
    reqetAt: req.reqTimes,
    length: tours.length,
    data: { tours },
  })
}

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)
  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: 'we could not find any data' })

  return res.status(200).json({ status: 'success', data: { tour } })
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ status: 'You must specify price and name!' })
  }
  next()
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)

  if (!tour)
    return res
      .status(404)
      .json({ status: 'fail', message: 'we could not find any data' })

  return res.status(200).json({ status: 'success', data: '<Updated Tour>' })
}

exports.deleteTour = (req, res) => {
  const tour = tours.find((tour) => +req.params.id === tour.id)

  if (!tour) return res.status(204).json({ status: 'fail', message: null })

  return res.status(200).json({ status: 'success', data: '<Deleted Tour>' })
}
