const http = require('http')

const server = http.createServer()

// http服务器收到请求时触发
// req表示客户端发来的请求，可以从中读到请求相关的信息
// res表示对客户的响应，可以通过该对象响应客户端
server.on('request', async (req, res) => {
  console.log(req.method, req.url, req.socket.remoteAddress)

  for await (var data of req) {
    console.log(data.toString())
  }

  res.writeHead(200, {
    Foo: '8888888888888',
    'Content-Type': 'text/html; charset=UTF-8',
  })

  res.write('<h1>hello</h1>')

  res.end() // 响应结束
})

server.listen(8082, () => {
  console.log('listening on port 8082')
})
