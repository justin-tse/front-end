const fs = require('fs')
const zlib = require('zlib')

const compressStream = zlib.createGzip()

console.log(process.pid)

var readable = fs.createReadStream('./package-lock.json')
var writeable = fs.createWriteStream('d:/ccc.gzip')

readable.pipe(compressStream).pipe(writeable)


// async function foo() {
//   for await (var data of readable) {
//     writeable.write(data)
//   }
//   writeable.end()
// }

// foo()


// readable.on('data', data => {
//   if (writeable.write(data) === false) {
//     readable.pause()
//   }
// })

// writeable.on('drain', () => {
//   readable.resume()
// })

// readable.on('end', () => {
//   writeable.end()
// })
