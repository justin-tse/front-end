


var figlet = require('figlet')

var str = process.argv[2]

figlet.text(str, (err, data) => {
  console.log(data)
})
