
export function add(a, b) {
  return a + b
}
// 具名导出可以声明的同时导出
export var PI = 0.141592653589793238462643383279 + add(1,2)


setTimeout(() => {
  PI = 9
}, 5000)


var a = 8
// 默认导出不带名字
export default a

export function mul(a, b) {
  return a * b
}

function div(a, b) {
  return a / b
}

function sub(a, b) {
  return a - b
}

// 具名导出不在声明的同时导出，则导出时要加{}
export { div, sub }

// export * from './foo.js'
// export { foo, bar } from './bar.js'
