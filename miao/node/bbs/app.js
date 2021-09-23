const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const Database = require('better-sqlite3')
const multer = require('multer')
const path = require('path')
const svgCaptcha = require('svg-captcha')
const md5 = val => val

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.random().toString(16).slice(2) + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })


const db = new Database(__dirname + '/bbs.sqlite3')

const port = 8008
const app = express()

// app.set('view engine', 'pug') // 模板默认扩展名，render时可以不写
app.set('views', __dirname + '/templates')
app.locals.pretty = true // 让pug输出格式化过的html
// app.engine('html', require('hbs').__express); // html扩展名的模板使用hbs包来render

// __tpl扩展名的模板使用这个函数来转换
app.engine('__tpl', function (filename, data, cb) {
  fs.readFile(filename, (err, content) => {
    if (err) {
      cb(err)
      return
    }
    var tpl = content.toString()
    var i = 0
    var result = tpl.replace(/_+/g, function() {
      return data[i++]
    })
    cb(null, result)
  })
})

// _______同学，在____年度，获得____奖.


app.use((req, res, next) => {
  console.log(req.method, req.url, req.headers.cookie)
  next()
})



app.use(cookieParser('cookie sign secert')) // cookie签名的密码
app.use(express.static(__dirname + '/static'))
app.use('/uploads', express.static(__dirname + '/uploads')) // 用于响应用户上传的头像请求
app.use(express.json()) // 解析json请求体的中间件
app.use(express.urlencoded()) // 解析url编码请求体的中间件


const sessions = {
}

setInterval(() => {
  console.log(sessions)
}, 5000)



app.use(function session(req, res, next) {
  if (!req.cookies.sessionId) {
    var sessionId = Math.random().toString(16).slice(2)

    res.cookie('sessionId', sessionId)
    sessions[sessionId] = {}
    req.session = sessions[sessionId]
  } else {
    if (!sessions[req.cookies.sessionId]) {
      sessions[req.cookies.sessionId] = {}
    }
    req.session = sessions[req.cookies.sessionId]
  }
  next()
})

// 将用户是否登陆放到req的isLogin字段上的中件间
app.use((req, res, next) => {
  if (req.signedCookies.loginUser) {
    var name = req.signedCookies.loginUser
    req.isLogin = true
    req.loginUser = db.prepare('SELECT * FROM users WHERE name = ?').get(name)
  } else {
    req.isLogin = false
    req.loginUser = null
  }
  next()
})

// app.get('/tpl-test', (req, res, next) => {
//   res.render('aaa.__tpl', ['张三','2077', '青铜'])
// })

// app.get('/tpl-test2', (req, res, next) => {
//   res.render('aaa.hbs', {a:1,b:2})
// })

app.get('/', (req, res, next) => {
  // console.log('当前登陆用户', req.signedCookies.loginUser)
  var page = Number(req.query.page || 1)
  var pageSize = 5
  var totalPost = db.prepare('SELECT count(*) AS total FROM posts').get().total
  var totalPage = Math.ceil(totalPost / pageSize)
  var offset = (page - 1) * pageSize

  var pagePosts = db.prepare('SELECT * FROM posts JOIN users ON posts.userId = users.userId LIMIT ? OFFSET ?').all(pageSize, offset)

  if (pagePosts.length == 0) {
    res.render('404.pug')
    return
  }

  res.render('home.pug', {
    isLogin: req.isLogin,
    loginUser: req.loginUser,
    posts: pagePosts,
    page: page,
    totalPage: totalPage,
  })
})

app.route('/post')
.get((req, res, next) => {
  res.render('issue-post.pug', {
    isLogin: req.isLogin,
    loginUser: req.loginUser,
  })
})
.post((req, res, next) => {
  var postInfo = req.body
  var userName = req.signedCookies.loginUser

  if (userName) {
    var user = db.prepare('SELECT * FROM users WHERE name = ?').get(userName)
    postInfo.timestamp = new Date().toISOString()
    postInfo.userId = user.userId

    var result = db.prepare('INSERT INTO posts (title, content, userId, timestamp) VALUES (?,?,?,?)')
      .run(postInfo.title, postInfo.content, postInfo.userId, postInfo.timestamp)

    res.redirect('/post/' + result.lastInsertRowid)
    // res.end('<script>location.href="/post/xxx"</script>')


    // var post = db.prepare('SELECT * from posts WHERE postId = ?').get(result.lastInsertRowid)

    // res.render('post.pug', { post ,comments: []})
  } else {
    res.end('401 not login')
  }
})

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id
  var post = db.prepare('SELECT * FROM posts JOIN users ON posts.userId = users.userId WHERE postId = ?').get(postId)
  if (post) {
    var comments = db.prepare('SELECT * FROM comments JOIN users ON comments.userId = users.userId WHERE postId = ?').all(postId)
    res.render('post.pug', {
      isLogin: req.isLogin, // true or false
      loginUser: req.loginUser, // object or null
      post: post,
      comments: comments,
    })
  } else {
    res.render('404.pug')
  }
})

// DELETE /comment/5 HTTP/1.1
app.delete('/comment/:id', (req, res, next) => {
  if (req.loginUser.userId !== req.params.id) {//此处有错误，应该拿评论所属用户的id来对比，而req.params.id是评论自己的id
    res.status(401).json({
      code: -1,
      msg: 'delete failed, not your comment'
    })
    return
  }

  db.prepare('DELETE FROM comments WHERE commentId = ?').run(req.params.id)
  res.json({
    code: 0,
    msg: 'delete success'
  })
})


// DELETE /post/5 HTTP/1.1
app.delete('/post/:id', (req, res, next) => {
  if (req.loginUser.userId !== req.params.id) {
    res.status(401).json({
      code: -1,
      msg: 'delete failed, not your post'
    })
    return
  }
  db.prepare('DELETE FROM posts WHERE postId = ?').run(req.params.id)
  db.prepare('DELETE FROM comments WHERE postId = ?').run(req.params.id)

  res.json({
    code: 0,
    msg: 'delete success'
  })
})

//向帖子发表评论，id为帖子编号
app.post('/comment/post/:id', (req, res, next) => {
  if (req.isLogin) {
    var comment = req.body
    var user = req.loginUser // 已登陆用户
    comment.timestamp = new Date().toISOString()
    comment.postId = req.params.id
    comment.userId = user.userId

    var result = db.prepare('INSERT INTO comments (content, postId, userId, timestamp) VALUES (@content, @postId, @userId, @timestamp)')
      .run(comment)

    res.redirect(req.headers.referer || '/')
  } else {
    res.render('not-login.pug')
  }
})

app.route('/register')
.get((req, res, next) => {
  res.render('register.pug')
})
.post((req, res, next) => {
  var regInfo = req.body

  var USERNAME_RE = /^[0-9a-z_]+$/i

  if (!USERNAME_RE.test(regInfo.name)) {
    res.status(400).end('username invalid, can only contain digit and letter and _')
  } else if (regInfo.password == 0) {
    res.status(400).end('password may not be empty')
  } else {
    var addUser = db.prepare('INSERT INTO users (name, password, email, avatar) VALUES (?, ?, ?, ?)')
    var result = addUser.run(regInfo.name, md5(regInfo.password), regInfo.email, regInfo.avatar)
    console.log(result)
    res.redirect('/login')
  }
})

app.get('/captcha-img', (req, res, next) => {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  res.type('svg');// response Content-Type
  res.status(200).send(captcha.data);
})

app.route('/login')
.get((req, res, next) => {
  // console.log('从哪里进到login页面的：', req.headers.referer)
  res.render('login.pug', {
    referer: req.headers.referer
  })
})
.post((req, res, next) => {
  var loginInfo = req.body

  if (loginInfo.captcha !== req.session.captcha) {
    res.end('captcha incorrect!')
    return
  }

  var user = db.prepare(`SELECT * FROM users WHERE name = ? AND password = ?`).get(loginInfo.name, md5(loginInfo.password))
  // var userStmt = db.prepare(`SELECT * FROM users WHERE name = 'foo' OR 1 = 1 OR '2' = '2' AND password = 'a'`)
  // var user = userStmt.get(loginInfo.name, loginInfo.password)
  // var user = userStmt.get()

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

var changePassMap = {
  // id: email,
}
// 打开忘记密码页面
app.get('/forget-password', (req, res, next) => {
  res.render('forget-password.pug')
})
// 提交自己的电子邮箱
app.post('/forget-password', (req, res, next) => {
  var email = req.body.email
  // 验证该电子邮箱是否是本网站用户

  var id = Math.random().toString(16).slice(2)

  changePassMap[id] = email

  setTimeout(() => {
    delete changePassMap[id]
  }, 20 * 60 * 1000)// 20分钟后删除，让链接失效

  var link = 'http://10.3.3.3:8008/forget-password/' + id

  console.log(link)

  // sendEmail(email, `
  //   请打开此链接以修改密码：20分钟内有效
  //   ${link}
  // `)
  res.end('邮件已发送，请按邮件提示操作')
})
// 从邮箱里打开修改密码的页面
app.get('/forget-password/:id', (req, res, next) => {
  var email = changePassMap[req.params.id]
  if (!email) {
    res.end('link expired')
    return
  }
  res.render('change-password.pug', {
    email: email
  })
})
// 提交修改好的密码
app.post('/forget-password/:id', (req, res, next) => {
  var email = changePassMap[req.params.id]
  if (!email) {
    res.end('link expired')
    return
  }
  if (req.body.password == req.body.password2) {
    db.prepare('UPDATE users SET password = ? WHERE email = ?').run(md5(req.body.password), email)
    res.end('ok!')
  } else {
    res.end('re type password incorrect!')
  }
})

app.get('/logout', (req, res, next) => {
  res.clearCookie('loginUser')
  res.redirect(req.headers.referer || '/')
})

app.post('/upload', upload.any(), (req, res, next) => {
  var files = req.files
  console.log(files)
  var urls = files.map(file => `http://localhost:8008/uploads/` + file.filename)
  res.json(urls)
})

app.listen(port, () => {
  console.log('listening on port', port)
})
