const child_process = require('child_process')
const fs = require('fs')



var cp = child_process.spawn('curl', ['https://cdn-fastly.obsproject.com/downloads/OBS-Studio-27.0.1-Full-Installer-x64.exe'])

cp.stdout.pipe(fs.createWriteStream('./baidu.html'))

cp.stderr.pipe(process.stdout)

cp.stderr.on('data', data => {
  console.log(data.toString())
})
