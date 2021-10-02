function session() {
  const sessions = {}
  return function session(req, res, next) {
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
  }
}
app.use(session())
