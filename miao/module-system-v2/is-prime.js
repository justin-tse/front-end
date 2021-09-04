
function isPrime(n) {
  for (var i = 2; i < n / 2; i++) {
    if (n % 2 == 0) {
      return false
    }
  }
  return true
}

var b = require('b.js')

console.log('show b in is-prime.js', b)

setTimeout(() => {
  console.log('show b in is-prime.js', b)
}, 1000)

exports.isPrime = isPrime
