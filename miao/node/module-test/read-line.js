const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'INPUT > '
});

// rl.question('What is your age? ', (age) => {
//   rl.question('What is your gender? ', gender => {
//     console.log('hi', gender, age)
//     rl.close()
//   })
// });

var dict = {
  cat: '猫',
  dog: '狗',
  pig: '猪',
  person: '人',
}

rl.prompt()
rl.on('line', word => {
  word = word.trim()
  var translation = dict[word]
  console.log(translation)
  rl.prompt()
})

// async function main() {
//   rl.prompt()
//   for await (var word of rl) {
//     word = word.trim()
//     var translation = await get('http://cidian.baidu.com/?q=' + word)
//     console.log(translation)
//     rl.prompt()
//   }
// }


// main()

// process.stdin.on('data', )
