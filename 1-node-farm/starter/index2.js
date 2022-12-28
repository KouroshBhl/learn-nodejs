//! Server
const fs = require('fs')
const http = require('node:http')
const url = require('url')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview')
  } else if (pathName === '/product') {
    res.end('This is the product')
  } else if (pathName === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Not found idiot',
    })
    res.end('<h1>Not found 404!</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000...')
})
