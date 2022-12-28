//! Server
const http = require('node:http')
const server = http.createServer((req, res) => {
  console.log(req)
  res.end('Welcome')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000...')
})
