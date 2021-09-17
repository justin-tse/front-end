var express = require('./impl-express')

var app = express()


app.use(function a(req, res, next) {
  console.log(req.method, req.url)
  req.foo = 8
  next()
})

app.use(function b(req, res, next) {
  next()
})
app.use(function c(req, res, next) {
  console.log(req.foo)
  debugger
  next()
})

app.listen(8005, () => {
  console.log(8005)
})
