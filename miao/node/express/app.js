const express = require('express')
const QueryString = require('qs')
const path = require('path')
const fs = require('fs')
const exp = require('constants')


const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})


app.use(express.static('../bbbb/'))

app.use(express.json())
app.use(express.urlencoded())

// 子站点

// baike.baidu.com
// zhidao.baidu.com
// news.baidu.com

// www.baidu.com/baike/item/239492834
// www.baidu.com/zhidao/question/33333
// www.baidu.com/news/
// www.baidu.com/news/finawkjeflal
// www.baidu.com/news/sport
// www.baidu.com/news/huabian
// www.baidu.com/news/joy

// var news = require('./news.js')
// app.use('/xinwen', news)

// /question/342983294
// /question/294335423

// app.get('/question/:qid-:xxx', function (req, res, next) {
//   // req.params.qid
//   res.end('current view question:' + req.params.qid + req.params.xxx)
// })

// app.get('/people/:uid', function (req, res, next) {
//   // req.params.uid
//   res.end('current view people:' + req.params.uid)
// })
// app.get('/question/:qid/answer/:aid', function (req, res, next) {
//   // req.params.qid/aid
//   res.end('current view people:' + req.params.uid)
//   setTimeout(() => {
//     next(2)
//   })
// })

app.set('x-powered-by', false)

app.use(function (req, res, next) {
  next(5)
})
app.use(function (req, res, next) {
  console.log(1)
})

app.use(function (err, req, res, next) {
  console.log(2)
  netx()
})

app.use(function (req, res, next) {
  console.log(3)
  res.sendFile('./aaa.html')
})


// app.post('/bar', function (req, res, next) {
//   res.end('barrrrrrrrrrrrrr')
// })
// app.route('/baz')
//   .get(function (req, res, next) {
//     res.end('get /baz')
//   })
//   .post(function (req, res, next) {
//     res.end('post /baz')
//   })




// app.set('case sensitive routing', false)
// app.set('query parser', '')
// app.get('x-powered-by', false) // 是否发送X-Powerd-By响应头



// app.use((req, res, next) => {
//   res.end('hello, your request body is ' + req.body)
//   next()
// })


app.listen(8003, () => {
  console.log('listening on port', 8003)
})

// const https = require('https')
// const servers = https.createServer({
//   key: 私钥
//   cert: 证书
// })

// const http = require('http')
// const server = http.createServer()

// servers.on('request', app)
// server.on('request', app)











// const baseDir = '.'
// // 看请求的文件在某个文件夹里有没有，如果有就返回，如果没有就啥也不做
// app.use(function staticfilemiddleware(req, res, next) {
//   var targetPath = path.join(baseDir, path.normalize(req.url))
//   fs.stat(targetPath, (err, stat) => {
//     if (err) {
//        next()
//     } else {
//       if (stat.isFile()) {
//         fs.createReadStream(targetPath).pipe(res)
//       } else {
//         next()
//       }
//     }
//   })

// })

// 请求头Content-Type: text/plain, text/html, application/json, application/javascript
// app.use(function getbodytext(req, res, next) {
//   if (req.is('text') || req.is('json')) {
//     var body = ''

//     req.on('data', data => {
//       body += data.toString()
//     })
//     req.on('end', () => {
//       req.body = body
//       next()
//     })
//   } else {
//     next()
//   }
// })
// app.use(function bodyjsonparser(req, res, next) {
//   if (req.is('json')) {
//     req.body = JSON.parse(req.body)
//     next()
//   } else {
//     next()
//   }
// })
// app.use(function bodyurlencodeparser(req, res, next) {
//   if (req.is('urlencoded')) {
//     req.body = QueryString.parse(req.body)
//     next()
//   } else {
//     next()
//   }
// })
