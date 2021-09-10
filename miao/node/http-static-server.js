const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const url = require('url')
const mime = require('mime')
const groupBy = require('lodash/groupBy')
const argv = require('minimist')(process.argv.slice(2));
const open = require('open')

const port = argv.port || argv.p || 8080
const cors = argv.cors || argv.c || false
const dir =  argv._[0] || '.'
const openBrowser = argv.open || argv.o || false

const server = http.createServer()

const baseDir = path.resolve(dir)

console.log('servering', baseDir)

server.on('request', async (req, res) => {
  console.log(req.method, req.url)

  var urlObj = url.parse(req.url)

  var decodedUrl = decodeURIComponent(urlObj.pathname)

  var targetPath = path.join(baseDir, decodedUrl)
  console.log(targetPath)

  // 目标路径之后的路径
  var tailPath = targetPath.slice(baseDir.length)
  var pathParts = tailPath.split(path.sep)

  //条件成立时是访问到了以点开头的文件，为隐藏文件，禁止输出
  if (pathParts.some(it => it.startsWith('.'))) {
    res.writeHead(403, { // 403 Forbiden
      'Content-Type': 'text/html; charset=UTF-8'
    })
    res.write('403 Forbiden')
    res.end()
    return
  }

  // 目标路径是否在baseDir以内，如果不在，禁止输出
  if (!targetPath.startsWith(baseDir)) {
    res.writeHead(403, { // 403 Forbiden
      'Content-Type': 'text/html; charset=UTF-8'
    })
    res.write('403 Forbiden')
    res.end()
    return
  }


  try {
    var stat = await fsp.stat(targetPath)

    if (stat.isFile()) {
      try {
        var data = await fsp.readFile(targetPath)
        var type = mime.getType(targetPath)

        if (cors) {
          res.setHeader('Access-Control-Allow-Origin', '*')
        }
        res.writeHead(200, {
          'Content-Type': type,
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
          throw e
        }
      }
    }
    if (stat.isDirectory()) {
      // 如果访问的是文件夹但没有以斜杠结尾，跳到以斜杠结尾的地址
      if (!decodedUrl.endsWith('/')) {
        res.writeHead(302, {
          Location: decodedUrl + '/' + urlObj.search
        })
        res.end()
        return
      }

      // 如果访问的是方便夹，先尝试返回文件夹内的index.html文件
      var indexPath = path.join(targetPath, 'index.html')

      try {
        var indexData = await fsp.readFile(indexPath)
        if (cors) {
          res.setHeader('Access-Control-Allow-Origin', '*')
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
        })

        res.end(indexData)
      } catch (e) {
        // 如果index.html不存在或它是个文件夹
        if (e.code == 'ENOENT' || e.code == 'EISDIR') {
          var entries = await fsp.readdir(targetPath, { withFileTypes: true })

          if (cors) {
            res.setHeader('Access-Control-Allow-Origin', '*')
          }
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
          })


          // 去掉点开头的文件或文件夹
          var filtered = entries.filter(entry => !entry.name.startsWith('.'))
          var sorted = sortDirents(filtered)

          res.write(`
            <div>
              <h1>Index of ${decodedUrl}</h1>
              <div><a href="../">../</a></div>
              ${sorted.map((entry) => {
                var slash = entry.isDirectory() ? '/' : ''
                return `<div>
                  <a href="${path.posix.join(decodedUrl, entry.name)}${slash}">${entry.name}${slash}</a>
                </div>`
              }).join('\n')}

              <p>
                Node.js ${process.version}/ my Nubility static server running @ ${req.socket.localAddress}:${port}
              </p>
            </div>
          `)

          res.end()
        } else {
          throw e
        }
      }

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

server.listen(port, '127.0.0.1', () => {
  console.log('listening on port', port)
  if (openBrowser) {
    open(`http://127.0.0.1:${port}/`)
  }
})


// 为文件夹的条目排序，文件夹在前，文件在后，按字母序排
function sortDirents(entries) {
  // 将文件夹与文件分组
  var grouped = groupBy(entries, it => {
    if (it.isDirectory()) {
      return 'dirs'
    } else {
      return 'files'
    }
  })

  grouped.dirs = grouped.dirs || []
  grouped.files = grouped.files || []

  // 分别排序后重新合起来
  var sorted = grouped.dirs.sort().concat(grouped.files.sort())
  return sorted
}
