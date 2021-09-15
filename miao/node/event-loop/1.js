

process.nextTick(function b() {
  process.nextTick(b)
})


Promise.resolve().then(() => {
  console.log(2)
})



// setImmediate(function a() {
//   console.log(1)
//   Promise.resolve().then(function b() {
//     console.log(3)
//     Promise.resolve().then(function e() {
//       console.log(5)
//     })
//   })
// })

// setImmediate(function c() {
//   console.log(2)
//   Promise.resolve().then(function d() {
//     console.log(4)
//   })
// })









// var count = 0
// var start = Date.now()

// var p = Promise.resolve()

// process.nextTick(function f() {
//   count++
//   if (Date.now() - start < 1000) {
//     process.nextTick(f)
//   } else {
//     console.log(count)
//   }
// })


// var fs = require('fs')


// fs.readFile('woiefj', (err, data) => {

//   setImmediate(() => {
//     console.log(3)
//   })

//   // process.nextTick(() => {
//   //   console.log(4)
//   // })

//   setTimeout(() => {
//     console.log(1)
//   })
// })


// var start = Date.now()

// while (Date.now() - start < 5) {

// }

// Promise.resolve().then(() => {
//   console.log(2)
// })
