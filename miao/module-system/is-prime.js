
function isPrime(n) {
  for (var i = 2; i < n / 2; i++) {
    if (n % 2 == 0) {
      return false
    }
  }
  return true
}
var b = require('b.js')

module.exports = isPrime
