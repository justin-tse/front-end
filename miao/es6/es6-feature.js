// 箭头函数不能new，没有prototype，不能在里面使用arguments，this直接看其外面

function fibb(n, a = 1, b = 1) {
  if (n == 1) {
    return a
  } else {
    return fibb(n - 1, b, a + b)
  }
}

x = 'ccc'

obj = {
  a,
  b: 3,
  c() {

  },
  d: () => { },
  *e() {
  },
  async [x + x]() { },
  async * bar() { },
  get g() { },
  set g(val) { },
  [x]: 8,
  *[Symbol.iterator]() {
    yield 1; yield 2; yield 3;
  }
}


  (function () {

    var age = Symbol('age')

    window.People = function People() {
      this[age] = 18
    }

  })

p = new People()
sys = Object.getOwnPropertySymbols(p) // 如果不使用这种办法，外界访问不到age变量对应的symbol就无法读到年龄
var ageSyl = sys[3]
p[ageSyl] // -> 18

// 用symbol实现私有属性


  (function () {

    var map = new WeakMap() // WeakSet() 弱引用映射/集合:当对象只有WeakMap持有时，其它所有的代码都没有这个对象的指针时，该对象会被垃圾回收

    window.People = function People() {
      var privateFields = {} // 用于存储私有属性的对象
      map.set(this, privateFields)

      privateFields.age = 18
    }

    People.prototype.getAge = function () {
      var privateFields = map.get(this)
      return privateFields.age
    }

  })()


function People(number) {
  var age = number

  this.getAge = function () {
    return age
  }
}


function People(number) {
  var age = number

  this.getAge = function () {
    return age - 2
  }
}


function MyRegExp(str) {
  // this is {}    []
  var obj = new RegExp(str)
  obj.__proto__ = MyRegExp.prototype

  // 对ary进行深加工


  return obj
}

MyRegExp.prototype.__proto__ = RegExp.prototype

MyRegExp.prototype.exec = function (str, startIdx) { }


// 、、es5中继承原生类型的写法


class Foo extends Array {
  constructor() {
    super()
    this.xxx = 2
  }
}


function MyRegExp(str) {
  // this is {}    [] 
  var obj = new RegExp(str)// 为什么super之前不能访问this，因为这里的obj就对应es6语法中的this,这此行代码运行完成之前obj还是空，访问也没有意义
  obj.__proto__ = MyRegExp.prototype

  // 对ary进行深加工


  return obj // 用obj代替this返回
}

MyRegExp.prototype.__proto__ = RegExp.prototype

MyRegExp.prototype.exec = function (str, startIdx) { }
