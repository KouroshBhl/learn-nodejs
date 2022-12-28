const fs = require('fs')
const readingFile = fs.readFileSync('./txt/read-this.txt', 'utf-8')

//! Blocking read, write file
fs.writeFileSync(
  './txt/writeHere.txt',
  `I wrote this: ${readingFile} \n ${Date.now()} `
)

//! Asynchoronus way, Callback hell
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log(`There is an error ${err.message}`)
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      fs.writeFile(
        './txt/final.txt',
        `${data1} \n \n ${data2} \n \n ${data3}`,
        (err) => {
          console.log('Ur file has been written!')
        }
      )
    })
  })
})
console.log('reading...')
