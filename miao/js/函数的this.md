函数的this
  函数的this指向什么值取决于函数的【调用形式】，与函数的定义位置和调用位置无关
  调用形式主要分以下几种：
    f() 以函数的形式调用，this指向全局作用域对象，在浏览器里是window
    obj.f() 以对象方法的形式调用，f的this指向obj
    f.call/apply(obj5) 直接用call或apply调用，f的this指向obj5
    new f() 以构造函数的形式调用，f里的this指向一新的空对象，且其原型为f.prototype
    将函数传给其它函数时，无法确定函数的this，需要看那个函数是以何种形式调用该函数的
    将函数从对象里读出放一个变量中，通过该变量调用该函数，this为window
    箭头函数的this相当于一个未在箭头函数内声明的普通变量，即箭头函数的this看其外面的this，如果外面是一个函数，得先确定这个函数此时的this，如果外面依然是一个箭头的内部，则看更外层
原型
  除了null和undefined，每个值都有原型，可以通过__proto__属性读到，也可以通过Object.getPrototypeOf(cal)访问到
  原型的作用是做属性读取的后备(fallback)
    即当在一个对象上查找某个属性找不到时，会到它的原型对象上找，如果原型对象上找不到，会在该原型对象的原型上找，以此类推
  每个函数都自动有一个prototype属性，这个属性跟该函数的__proto__没有任何关系
    它是做为被该函数构造出来的对象的原型的
      构造函数的得名：构造函数会申请必要的空间，并在该空间内存储为了表示该对象所必要的信息


new Constructor(...args)
NEW(Constructor, ...args)

function NEW(Constructor, ...args) {
  var obj = Object.create(Constructor.prototype)
  var result = Constructor.call(obj, ...args)
  if (result && typeof result === 'object') {
    return result
  } else {
    return obj
  }
}

function ListNode(val) {
  this.val = val
  this.next = null
}

function Stack() {
  this.head = null
  this._size = 0
}

Stack.prototype.push = function (val) {
  var node = new ListNode(val)
  node.next = this.head
  this.head = node
  this._size++
  return this
}
Stack.prototype.pop = function () {
  if (this.head) {
    var val = this.head.val
    this.head = this.head.next
    this._size--
    return val
  } else {
    return undefined
  }
}
Stack.prototype.peek = function () {
  if (this.head) {
    return this.head.val
  }
}


function Queue() {
  this.head = null
  this.tail = null
  this.size = 0
}

Queue.prototype.enqueue = function (val) {
  var node = new ListNode(val)
  this.size++
  if (this.head == null) {
    this.head = this.tail = node
  } else {
    this.tail.next = node
    this.tail = node
  }
}

Queue.prototype.dequeue = function () {
  if (this.head) {
    var val = this.head.val
    this.head = this.head.next
    if (this.head == null) {
      this.tail = null
    }
    this.size--
    return val
  }
}




var stack = new Stack()
stack.push(1)
stack.push(2)
var stack2 = new Stack()
stack2.push(1)
stack2.push(2)



var l = null
function pushStack(l, val) {
  var node = new ListNode(val)
  node.next = l
  l = node
}
function popStack(l) {
  if (l) {
    var val = l.val
    l = l.next
    return val
  } else {
    return undefined
  }
}
