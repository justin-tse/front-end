const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const url = require('url')
const mime = require('mime')


const port = 8085
const server = http.createServer()

const baseDir = 'C:/Users/xieran/Desktop/99/node'


server.on('request', async (req, res) => {
  console.log(req.method, req.url)

  var urlObj = url.parse(req.url)

  var decodedUrl = decodeURIComponent(urlObj.pathname)

  var targetPath = path.join(baseDir, decodedUrl)

  console.log(targetPath)

  var stat = await fsp.stat(targetPath)

  if (stat.isFile()) {
    try {
      var data = await fsp.readFile(targetPath)
      var type = mime.getType(targetPath)

      res.writeHead(200, {
        'Content-Type': type
      })

      res.write(data)
      res.end()
    } catch (err) {
      console.log(err)
      if (err.code == 'ENOENT') { // 目标的文件不存在
        res.writeHead(404)
        res.write('404 Not Found')
        res.end()
      } else {
        res.writeHead(400)
        res.end()
      }
    }
  }
  if (stat.isDirectory()) {
    var fileNames = await fsp.readdir(targetPath)

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    })

    res.write(`
      <div>
        ${fileNames.map(name => {
          return `<div><a href="${name}/">${name}</a></div>`
        }).join('\n')}
      </div>
    `)

    res.end()
  }
})

server.listen(port, () => {
  console.log('listening on port', port)
})
