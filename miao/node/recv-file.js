
const net = require('net')
const fs = require('fs')

const writestream = fs.createWriteStream('./bbb.mkv')

const server = net.createServer(conn => {
  conn.on('data', data => {
    writestream.write(data)
  })
  conn.on('end', () => {
    writestream.end()
  })
})

server.listen(10086, () => {
  console.log(10086)
})
