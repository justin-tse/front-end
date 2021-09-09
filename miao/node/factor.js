#!/usr/bin/env node

var n = Number(process.argv[2])
var m = n

var primeFactors = []

for (var i = 2; i < n * 2; i++) {
  if (n % i == 0) {
    primeFactors.push(i)
    n = n / i
    i--
  }
}

var output = `${m}: ${primeFactors.join(' ')} ${n}`

console.log(output)

process.exit(0)
