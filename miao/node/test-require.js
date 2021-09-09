var figlet = require('figlet')


var a = figlet.textSync('hello')
console.log(a)

figlet.text('hello world', {
  font: 'Doh',
}, (err, result) => {
  console.log(result)
})


23
/**
 *     -   -
 *      |   |
 *     -   -
 *    |     |
 *     -   -
 *
 *
 */
