var net = require('net') // 获取tcp模块

var server = net.createServer() // 创建tcp服务器

// 当服务器接收到一个客户端连接时
server.on('connection', (conn) => {

  // 连接上收到数据时
  conn.on('data', data => {
    console.log(data.toString())

    conn.write('HTTP/1.1 200 OK hahahahahah\r\n')
    conn.write('Content-Type: text/html; charset=UTF-8\r\n')
    conn.write('\r\n')
    conn.write(`<meta charset="UTF-8">`)
    conn.write(`<h1>It works! ${new Date()}</h1>`)
    conn.end()
  })

})

var port = 80

// 让服务端开始监听
server.listen(port, () => {
  // 监听成功后输出
  console.log('listening on port', port)
})
