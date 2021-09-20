const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')

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

// 将用户是否登陆放到req的isLogin字段上的中件间
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

app.get('/tpl-test', (req, res, next) => {
  res.render('aaa.__tpl', ['张三','2077', '青铜'])
})

app.get('/tpl-test2', (req, res, next) => {
  res.render('aaa.hbs', {a:1,b:2})
})

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  console.log('当前登陆用户', req.signedCookies.loginUser)
  var page = Number(req.query.page || 1)
  var pageSize = 10
  var totalPage = Math.ceil(posts.length / pageSize) // 总页码
  var startIdx = (page - 1) * pageSize
  var endIdx = startIdx + pageSize
  var pagePosts = posts.slice(startIdx, endIdx)

  if (pagePosts.length == 0) {
    res.render('404.pug')
    return
  }

  res.render('home.pug', {
    isLogin: req.isLogin,
    posts: pagePosts,
    page: page,
    totalPage: totalPage,
  })
})

app.route('/post')
.get((req, res, next) => {
  res.render('issue-post.pug', {
    isLogin: req.isLogin
  })
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
    res.render('post.pug', {
      isLogin: req.isLogin,
      post: post,
      comments: postComments,
    })
  } else {
    res.render('404.pug')
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
  } else if (users.some(it => it.name == regInfo.name)) {
    res.status(400).end('username already exists')
  } else if (users.some(it => it.email == regInfo.email)) {
    res.status(400).end('email already exists')
  } else if (regInfo.password == 0) {
    res.status(400).end('password may not be empty')
  } else {
    regInfo.id = users.length
    users.push(regInfo)
    res.render('register-success.pug')
  }
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
