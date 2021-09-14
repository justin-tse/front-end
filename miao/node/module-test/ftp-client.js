const fs = require('fs')
const repl = require('repl')
const readline = require('readline')
const net = require('net')

const host = process.argv[2] || '127.0.0.1'
const port = process.argv[3] || 21

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'ftp > '
})

const conn = net.connect(port, host, async () => {
  var connIter = conn[Symbol.asyncIterator]()

  conn.on('data', line => {
    line = line.toString()
    if (line.startsWith('220')) {
      console.log(line)
    }
  })

  setTimeout(() => {
    rl.prompt()
  }, 100)

  rl.on('line', async line => {
    line = line.trim()

    if (line.startsWith('user')) {
      conn.write('USER ' + line.split(' ')[1] + '\r\n')
    } else if (line.startsWith('pass')) {
      conn.write('PASS ' + line.split(' ')[1] + '\r\n')
    } else if (line.startsWith('list')) {
      conn.write('PASV\r\n')
      var gen = await connIter.next()
      var res = gen.value.toString()
      var targetPort = res.match(/\(.*$/)[0]
      console.log(targetPort)
    }

    rl.prompt()
  })
})
