var { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8088 })

wss.on('connection', function connection(ws) {
  console.log('someone comes')
  ws.on('message', function incoming(message) {
    console.log('received length:', message.length)
  })

  setInterval(() => {
    ws.send('something'.repeat(1000 * Math.random() | 0))
  }, 1000)
})
