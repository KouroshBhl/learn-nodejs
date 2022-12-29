//! Server
const fs = require('fs')
const http = require('node:http')
const url = require('url')

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUT%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  return output
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' })

    const cardsHtml = dataObj
      .map((card) => replaceTemplate(tempCard, card))
      .join()

    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml)
    console.log(cardsHtml)

    res.end(output)
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
