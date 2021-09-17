const express = require('express')

var news = express.Router() // 子路由

var yule = express() // 娱乐新闻分类

yule.get('/yulequan', (req, res, next) => {
  res.end('娱乐圈新闻')
})
yule.get('/gaoxiao', (req, res, next) => {
  console.log(req.url)
  res.end('搞笑')
})

news.get('/sport', (req, res, next) => {
  res.end('体育新闻')
})
news.use('/yule', yule)

// module.exports = news
