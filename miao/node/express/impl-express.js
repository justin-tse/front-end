const http = require('http')

function express() {
  var middlewares = []

  var app = function (httpReq, httpRes) {
    // var expReq = new ExpressRequest(httpReq)
    // var expRes = new ExpressResponse(httpRes)

    var i = 0

    run()

    function run() {
      if (i < middlewares.length) {
        var middleware = middlewares[i++]
        process.nextTick(() => {
          middleware(httpReq, httpRes, function next() {
            run()
          })
        })
      }
    }
  }

  app.use = function (middleware) {
    middlewares.push(middleware)
  }
  app.get = function (url, middleware) {

    app.use(function (req, res, next) {
      if (req.url == url && req.method == 'GET') {
        middleware(req, res, next)
      } else {
        next()
      }
    })

  }
  app.post = function (url, middleware) {
    app.use(function (req, res, next) {
      if (req.url == url && req.method == 'POST') {
        middleware(req, res, next)
      } else {
        next()
      }
    })
  }

  app.listen = function (...args) {
    var server = http.createServer()
    server.on('request', this)
    server.listen(...args)
  }

  return app
}


function express2() {
  var middlewares = []
  var composed = function () { }
  var app = function (httpReq, httpRes) {
    composed(httpReq, httpRes)
  }

  app.use = function (middleware) {
    middlewares.push(middleware)
    composed = composeMiddlewares(middlewares)
  }

  app.listen = function (...args) {
    var server = http.createServer()
    server.on('request', this)
    server.listen(...args)
  }

  return app
}

function composeMiddlewares(middlewares) {
  return middlewares.reduceRight((prev, middleware) => {
    return (req, res) => {
      middleware(req, res, function next() {
        prev(req, res)
      })
    }
  }, () => { })
}

module.exports = express2
