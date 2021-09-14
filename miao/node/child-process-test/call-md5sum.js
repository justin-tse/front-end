const child_process = require('child_process')


var cp = child_process.spawn('md5sum', ['../bbb.mkv'], {

})

cp.stdout.on('data', data => {
  console.log(data.toString())
})
