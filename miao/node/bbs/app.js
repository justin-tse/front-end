const exp = require('constants')
const express = require('express')
const fs = require('fs')

const port = 8008
const app = express()

const users = loadfile('./users.json')
const posts = loadfile('./posts.json')

function loadfile(file) {
  try {
    var content = fs.readFileSync(file)
    return JSON.parse(content)
  } catch (e) {
    return []
  }
}

setInterval(() => {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
  fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2))
  console.log('saved')
}, 5000)

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(express.static(__dirname + '/static'))
app.use(express.json()) // 解析json请求体的中间件
app.use(express.urlencoded()) // 解析url编码请求体的中间件

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.end(`
    <h1>BBS</h1>
    <div>
      <a href="/login">登陆</a>
      <a href="/register.html">注册</a>
    </div>
  `)
})

app.route('/post')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/post.html')
})
.post((req, res, next) => {
  var postInfo = req.body
  postInfo.timestamp = new Date().toISOString()
  postInfo.id = posts.length
  posts.push(postInfo)
  res.end('post success, the post id is ' + postInfo.id)
})

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id
  var post = posts.find(it => it.id == postId)
  if (post) {
    res.end(`
      <h1>${post.title}</h1>
      <fieldset>${post.content}</fieldset>
    `)
  } else {
    res.end('404 post not found')
  }
})

app.route('/register')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/register.html')
})
.post((req, res, next) => {
  var regInfo = req.body
  if (users.some(it => it.name == regInfo.name) || users.some(it => it.email == regInfo.email)) {
    res.status(400).end('username of email already exists...')
  } else {
    regInfo.id = users.length
    users.push(regInfo)
    res.end('register success...')
  }
})

app.route('/login')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/login.html')
})
.post((req, res, next) => {
  var loginInfo = req.body
  if (users.find(it => it.name == loginInfo.name && it.password == loginInfo.password)) {
    res.end('login success ')
  } else {
    res.end('username of password incorrect')
  }
})





app.listen(port, () => {
  console.log('listening on port', port)
})
