const net = require('net')

const host = process.argv[2]
const port = Number(process.argv[3])

const conn = net.connect(port, host, () => {
  process.stdin.pipe(conn).pipe(process.stdout)
})
