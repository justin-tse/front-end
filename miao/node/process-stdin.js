
var fs = require('fs')

// 将从进程标准输入流中读到的数据写入一个文件　

var writable = fs.createWriteStream('./data-from-process-stdin.txt')

process.stdin.on('data', (data) => {
  writable.write(data)
})
