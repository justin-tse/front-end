const child_process = require('child_process')


var stdout = child_process.execSync('ls .. -lha', {
})
console.log(stdout.toString())

child_process.execFileSync('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
