const stream = require('stream')
const fs = require('fs')
const { findSourceMap } = require('module')


const Readable = stream.Readable
const Writable = stream.Writable
const Duplex = stream.Duplex
const Transform = stream.Transform


function createUpperCaseStream() {
  return new Transform({
    transform(chunk, encoding, callback) {
      var upper = chunk.toString().toUpperCase()

      callback(null, Buffer.from(upper))
    }
  })
}

function createReadWriteStream() {
  return new Duplex({
    read() { },
    write() { },
  })
}


// 创建一个可以读出当前时间的流对象
// 即每次data事件的数据都是当前时间
function createTimeStream() {
  return new Readable({
    // highWaterMark: 1000000, //流的缓冲区大小，单位为字节
    // 当流的缓冲区为空但有人想从这个流对象中读取数据时
    // 流的调度会自动调用这个函数来让流的实现者准备数据
    // 准备好的数据通过push放入当前流对象的缓冲区
    read(size) {
      this.push(new Date().toString())
    }
  })
}

// timeStream = createTimeStream()

// timeStream.on('data', time => {
//   console.log(time.toString())
// })

function createFileReadStream(filePath) {
  var fd = fs.openSync(filePath)
  var pos = 0

  return new Readable({
    read() {
      var size = 2048
      var buf = Buffer.alloc(size)

      fs.read(fd, buf, 0, size, pos, (err, bytesRead) => {
        pos += bytesRead
        if (bytesRead == size) {
          this.push(buf) // 将读到的数据放入流的缓冲区
        } else {
          this.push(buf.slice(0, bytesRead)) // 将读到的数据放入流的缓冲区
          this.push(null) // 关闭可读流对象
          fs.closeSync(fd) // 关闭文件
        }
      })

    }
  })
}

// var readable = createFileReadStream('./package-lock.json')

// readable.on('data', (data) => {
//   console.log(data.toString())
// })


function createFileWriteStream(filePath) {
  var fd = fs.openSync(filePath, 'w')
  var pos = 0
  return new Writable({
    // 使用者write进本可写流的数据，会被流的调度系统调用这个函数来消费
    write(chunk, encoding, callback) {
      fs.write(fd, chunk, 0, chunk.length, pos, (err, bytesWritten) => {
        pos += chunk.length
        callback()
      })
    }
  })
}

console.log(process.pid)

createFileReadStream('./package-lock.json')
  .pipe(createUpperCaseStream())
  .pipe(createFileWriteStream('./upper-lock.json'))

// stream.pipeline(
//   createFileReadStream('./package-lock.json'),
//   createUpperCaseStream(),
//   createFileWriteStream('./upper-lock.json')
// )


// class Xxxxxx extends Writable {
//   constructor() {
//     super({ })

//   }
//   _read() { }
//   _transform() {

//   }
//   _write() {

//   }
// }

// x = new Xxxxxx()

// x.write()
