const vm = require('vm');

global.x = 1;

const context = { x: 2, console: console};
vm.createContext(context); // Contextify the object.

const code = 'x += 40; var y = 17; console.log(x + y); console.log = 8';
// `x` and `y` are global variables in the context.
// Initially, x has the value 2 because that is the value of context.x.
vm.runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17

console.log(x); // 1; y is not defined.
