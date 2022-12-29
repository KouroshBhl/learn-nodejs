const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  //!Sol 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) return console.log('There is an error')
  //   res.end(data)
  // })
  //! Sol 2: strams
  //   const readable = fs.createReadStream('test-file.txt')
  //   readable.on('data', (chunk) => {
  //     res.write(chunk)
  //   })
  //   readable.on('end', () => {
  //     res.end()
  //   })
  //   readable.on('error', (err) => {
  //     console.log(err)
  //     res.statusCode = 500
  //     res.end('File not found')
  //   })
  //! Sol 3
  const readable = fs.createReadStream('test-file.txt')
  readable.pipe(res)
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening...')
})
