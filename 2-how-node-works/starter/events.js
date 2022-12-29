const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
  constructor() {
    super()
  }
}

const myEmitter = new Sales()

myEmitter.on('newSale', () => {
  console.log('There was a new sell')
})

myEmitter.on('newSale', () => {
  console.log('Sold')
})

myEmitter.on('newSale', (stock) => {
  console.log(`Total stock is ${stock}`)
})

myEmitter.emit('newSale', 9)

//! Server
const server = http.createServer()
server.on('request', (req, res) => {
  console.log('Listening for request event')
  res.end('Listening')
})
server.on('request', (req, res) => {
  console.log('Listening for request event😊')
})
server.on('close', (req, res) => {
  console.log('Listening for request event😊')
})

server.listen(8000, '127.0.0.1', () =>
  console.log('Server waiting for request')
)
