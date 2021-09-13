
const net = require('net')
const fs = require('fs')

const readstream = fs.createReadStream('./aaa.mkv')

console.log(process.pid)

const conn = net.connect(8082, 'damiaoedu.com', () => {
  console.log('connect ok')

  readstream.on('data', data => {
    if (conn.write(data) == false) {
      console.log('pause')
      readstream.pause() // 让可读流暂停，即不再触发data事件
    }
  })

  // 当前可写流缓冲区的数据消耗完的时候触发
  conn.on('drain', () => {
    console.log('resume')
    readstream.resume() // 让可读流恢复，即重新开始触发data事件
  })

  readstream.on('end', () => {
    conn.end()
  })
})
