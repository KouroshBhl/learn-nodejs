//! Server
const http = require('node:http')
const url = require('url')

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview')
  } else if (pathName === '/product') {
    res.end('This is the product')
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
