const repl = require('repl');



var dict = {
  cat: '猫',
  dog: '狗',
  pig: '猪',
  person: '人',
}

var rl = repl.start({
  prompt: 'Dict > ',
  eval: function (cmd, context, filename, callback) {
    callback(null, dict[cmd.trim()])
  }
})
