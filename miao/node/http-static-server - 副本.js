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

  try {
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
      var entries = await fsp.readdir(targetPath, { withFileTypes: true })

      // var fileStats = await Promise.all(fileNames.map(name => path.join(targetPath, name)).map(fsp.stat))

      // for (var name of fileNames) {
      //   var fullPath = path.join(targetPath, name)
      //   var stat = await fsp.stat(fullPath)
      //   fileStats.push(stat)
      // }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
      })

      res.write(`
        <div>
          <h1>Index of ${decodedUrl}</h1>
          ${entries.map((entry) => {
            var slash = entry.isDirectory() ? '/' : ''
            return `<div><a href="${entry.name}${slash}">${entry.name}${slash}</a></div>`
          }).join('\n')}

          <p>
            Node.js ${process.version}/ my Nubility static server running @ ${req.socket.localAddress}:${port}
          </p>
        </div>
      `)

      res.end()
    }
  } catch (e) {
    if (e.code == 'ENOENT') {
      res.writeHead(404)
      res.end('404 not found')
    } else {
      throw e
    }
  }
})

server.listen(port, '10.3.3.3', () => {
  console.log('listening on port', port)
})
