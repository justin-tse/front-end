var net = require('net')

var server = net.createServer()

server.on('connection', conn => {
  console.log(conn.remoteAddress, conn.remotePort, 'comes in')

  conn.write('将会把发过来的数据转成大写发回去')

  conn.on('data', data => {
    conn.write(data.toString().toUpperCase())
  })

  conn.on('error', () => { })
})

server.listen(55888, () => { // 开始监听
  console.log('监听成功')
})

// server.close() // 停止监听


//  以上是服务器

var conn = net.connect(55888, '10.3.3.3')

// conn.on('data', data => {
//   console.log(data.toString())
// })

conn.read(5)

conn.write(  'aaaa'.repeat(10000000)   )
