const exp = require('constants')
const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const escape = require('lodash/escape')

const port = 8008
const app = express()

const users = loadfile('./users.json')
const posts = loadfile('./posts.json')
const comments = loadfile('./comments.json')

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
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2))
  console.log('saved')
}, 5000)

app.use((req, res, next) => {
  console.log(req.method, req.url, req.headers.cookie)
  next()
})

app.use(cookieParser('cookie sign secert')) // cookie签名的密码
app.use(express.static(__dirname + '/static'))
app.use(express.json()) // 解析json请求体的中间件
app.use(express.urlencoded()) // 解析url编码请求体的中间件

app.use((req, res, next) => {
  if (req.signedCookies.loginUser) {
    req.isLogin = true
    // req.loginUser = users.find(it => it.name == req.signedCookies.loginUser)
  } else {
    req.isLogin = false
    // req.loginUser = null
  }
  next()
})

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  console.log('当前登陆用户', req.signedCookies.loginUser)
  var page = Number(req.query.page || 1)
  var pageSize = 10
  var startIdx = (page - 1) * pageSize
  var endIdx = startIdx + pageSize
  var pagePosts = posts.slice(startIdx, endIdx)

  if (pagePosts.length == 0) {
    res.end('no this page')
    return
  }

  res.end(`
    <h1>BBS</h1>
    <div>
      ${
        req.isLogin ?
          `
            <a href="/post">发贴</a>
            <a href="/logout">登出</a>
          ` : `
            <a href="/login">登陆</a>
            <a href="/register">注册</a>
          `
      }
    </div>
    <ul>
      ${
        pagePosts.map(post => {
          return `<li><a href="/post/${escape(post.id)}">${escape(post.title)}</a> by <span>${post.postedBy}</span></li>`
        }).join('\n')
      }
    </ul>
    <p>
      <a href="/?page=${page - 1}">上一页</a>
      <a href="/?page=${page + 1}">下一页</a>
    </p>
  `)
})

app.route('/post')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/post.html')
})
.post((req, res, next) => {
  var postInfo = req.body
  var userName = req.signedCookies.loginUser

  if (userName) {
    postInfo.timestamp = new Date().toISOString()
    postInfo.id = posts.length
    postInfo.postedBy = userName

    posts.push(postInfo)

    res.redirect('/post/' + postInfo.id)
  } else {
    res.end('401 not login')
  }
})

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id
  var post = posts.find(it => it.id == postId)
  if (post) {
    var postComments = comments.filter(it => it.postId == postId)
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.end(`
      <h1>BBS</h1>
      <div>
        ${
          req.signedCookies.loginUser ?
            `
              <a href="/post">发贴</a>
              <a href="/logout">登出</a>
            ` : `
              <a href="/login">登陆</a>
              <a href="/register">注册</a>
            `
        }
      </div>
      <h2>${escape(post.title)}</h2>
      <fieldset>${escape(post.content)}</fieldset>
      <hr>

      ${
        postComments.map(it => {
          return `
            <fieldset>
              <legend>${escape(it.commentBy)}</legend>
              <p>${escape(it.content)}</p>
            </fieldset>
          `
        }).join('\n')
      }

      ${
        req.isLogin ?
          `
            <form action="/comment/post/${postId}" method="POST">
              <h3>发表评论</h3>
              <div><textarea name="content"></textarea></div>
              <button>开怼</button>
            </form>
          ` : `<p>想发表评论？请 <a href="/login">登陆</a>`
      }
    `)
  } else {
    res.end('404 post not found')
  }
})

//向帖子发表评论，id为帖子编号
app.post('/comment/post/:id', (req, res, next) => {
  if (req.isLogin) {
    var comment = req.body
    comment.timestamp = new Date().toISOString()
    comment.postId = req.params.id
    comment.commentBy = req.signedCookies.loginUser

    comments.push(comment)

    res.redirect(req.headers.referer || '/')
  } else {
    res.end('not login')
  }
})

app.route('/register')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/register.html')
})
.post((req, res, next) => {
  var regInfo = req.body

  var USERNAME_RE = /^[0-9a-z_]+$/i

  if (!USERNAME_RE.test(regInfo.name)) {
    res.status(400).end('username invalid, can only contain digit and letter and _')
  } else if (users.some(it => it.name == regInfo.name)) {
    res.status(400).end('username already exists')
  } else if (users.some(it => it.email == regInfo.email)) {
    res.status(400).end('email already exists')
  } else if (regInfo.password == 0) {
    res.status(400).end('password may not be empty')
  } else {
    regInfo.id = users.length
    users.push(regInfo)
    res.end('register success')
  }
})

app.route('/login')
.get((req, res, next) => {
  // console.log('从哪里进到login页面的：', req.headers.referer)
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.end(`
    <h1>登陆</h1>
    <form action="/login" method="POST">
      <div>Username: </div>
      <input type="text" name="name">
      <div>Password: </div>
      <input type="password" name="password">
      <input hidden name="return_to" value="${req.headers.referer || '/'}">
      <br>
      <button>登陆</button>
    </form>
  `)
})
.post((req, res, next) => {
  var loginInfo = req.body
  var user = users.find(it => it.name == loginInfo.name && it.password == loginInfo.password)
  if (user) {
    res.cookie('loginUser', user.name, {
      signed: true
      // maxAge: 86400000, // 相对过期时间点，多久过期，过期后浏览器会自动删除，并不再请求中带上
      // expires: new Date(), // 绝对过期时间点
      // httpOnly: true, // 只在请求时带在头里，不能通过document.cookie读到
    })
    res.redirect(loginInfo.return_to)
  } else {
    res.end('username of password incorrect')
  }
})

app.get('/logout', (req, res, next) => {
  res.clearCookie('loginUser')
  res.redirect(req.headers.referer || '/')
})




app.listen(port, () => {
  console.log('listening on port', port)
})
