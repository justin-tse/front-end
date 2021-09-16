async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout0')
}, 0)
setTimeout(function () {
  console.log('setTimeout3')
}, 3)
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
async1();
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})
console.log('script end')


setImmediate(() => {
  console.log(3);
})

process.nextTick(() => {
  console.log(4);
})

setTimeout(() => {
  console.log(1);
})

Promise.resolve().then(() => {
  console.log(2);
})


const { endianness } = require("os");
const { resolve } = require("path");
// 
const { promisify } = require("util");

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')

// 'script start'
// 'async1 start'
// 'promise1'
// 'script end'
// 'async2'
// async1 end'
// 'promise2'
// 'setTimeout'

// 这是答案
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout


setTimeout(() => {
  console.log('0');
}, 0)

new Promise((resolve, reject) => { // 1
  console.log('1');
  resolve();
}).then(() => { // 2
  console.log('2');
  new Promise((resolve, reject) => {
    console.log('3');
    resolve();
  }).then(() => {     //📌 3
    console.log('4');
  }).then(() => {// 4
    console.log('5');
  })
}).then(() => { //3
  console.log('6');   //📌
})

new Promise((resolve, reject) => { // 1
  console.log('7');
  resolve()
}).then(() => {
  console.log('8');// 2
})
// 17236845
// 答案
// 17238465

async function async1() {
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2 end');
}

async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0)

new Promise(resolve => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  })

// async2 end
// 'Promise'
// async1 end
// promise1
// promise2
// setTimeout

console.log('script start');

async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
  return Promise.resolve().then(() => {
    console.log('async2 end1');
  })
}
async1()

// async2 end
// Promise
// script end
// async1 end
// promise1
// async2 end1
// promise2
// setTimeout


setTimeout(() => {
  console.log(2)
}, 2000)

new Promise((resolve, reject) => {
  console.log('p')
  resolve('p')
}).then(() => {
  setTimeout(() => {
    console.log(3)
  }, 10)
})

// p
// 3
// 2

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout0')
}, 0)
setTimeout(function () {
  console.log('setTimeout3')
}, 3)
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
async1();
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})
console.log('script end')

// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick
// async1 end
// promise3
// setTimeout0 setImmediate
// setTimeout3


setTimeout(() => console.log('a'), 0)
var p = new Promise((resolve) => {
  console.log('b');
  resolve();
}
);
p.then(() => console.log('c'));
p.then(() => console.log('d'));

console.log('e');

async function async1() {
  console.log("a");
  await async2();
  console.log("b");
}
async function async2() {
  console.log('c');
}

console.log("d");

setTimeout(function () {
  console.log("e");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("f");
  resolve();
}
).then(function () {
  console.log("g");
});

console.log('h');

// b
// e
// d
// a
// c
// f
// h
// c
// d
// b
// g
// a
// e
