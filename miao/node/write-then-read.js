

const fs = require('fs')
// const util = require('util')
const fsp = fs.promises

function callbackify(promiseStyle) {
  return function callbackStyle(...args) {
    var cb = args.pop()

    promiseStyle(...args).then(val => {
      cb(null, val)
    }, reason => {
      cb(reason)
    })
  }
}

// var callbackStyle = util.callbackify(promiseStyle)

// 将一个回调风格的函数转换为一个promise风格的函数
function promisify(callbackStyle) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      callbackStyle(...args, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

// function readFile(...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }


// function writeFile(...args) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(...args, (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve()
//       }
//     })
//   })
// }

var readFile = promisify(callbackify(promisify(fs.readFile)))
// var writeFile = util.promisify(fs.writeFile)

async function  f() {
  await fsp.writeFile('./fo.txt', 'hello')
  var text = await readFile('./fo.txt', 'utf8')
  console.log(text)
}

f()


// fs.writeFile('./fo.txt', 'hello', (err) => {

//   fs.readFile('./fo.txt', 'utf8', (err, text) => {
//     console.log(text)
//   })

// })
