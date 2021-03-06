
  function Vector(x, y) {
    if (new.target !== Vector) {
        return new Vector(x, y)
    }
    this.x = x
    this.y = y
  }

  Vector.prototype.plus = function(v) {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  Vector.prototype.minus = function(v) {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  function Complex(real, imag) {
    this.real = real
    this.imag = imag
  }
  // static method 静态方法
  Complex.fromString = function(str) {
    str = str.trim()
    var real = parseInt(str)
    var idx = str.indexOf('+', 1)
    if (idx == -1) {
      idx = str.indexOf('-', 1)
    }
    var imag = parseInt(str.slice(idx))
    return new Complex(real, imag)
  }
  Complex.prototype.plus = function(c) {
    return new Complex(this.real + c.real, this.imag + c.imag)
  }
  Complex.prototype.minus = function(c) {
    return new Complex(this.real - c.real, this.imag - c.imag)
  }
  Complex.prototype.multiple = function(c) {
    var r = this.real * c.real - this.imag * c.imag
    var i = this.real * c.imag + this.imag * c.real
    return new Complex(r, i)
  }
  Complex.prototype.division = function(c) {
    var d = new Complex(c.real, -c.imag)
    var a = this.multiple(d)
    var b = c.multiple(d)
    return new Complex(a.real / b.real, a.imag / b.real)
  }
  Complex.prototype.toString = function() {
    if (this.imag < 0) {
      return this.real + '' + this.imag + 'i'
    }
    return this.real + '+' + this.imag + 'i'
  }

  function MySet(inits) {
    this.elements = []
    for (var i = 0; i < inits.length; i++) {
      this.add(inits[i])
    }
  }
  MySet.prototype = {
    constructor: MySet,
    add(val) {
      if (!this.has(val)) {
        this.elements.push(val)
      }
      return this
    },
    delete(val) {
      if (val !== val) {
        var idx = this.elements.findIndex(it => it !== it)
        if (idx >= 0) {
          this.elements.splice(idx, 1)
          return true
        }
        return false
      }
      var idx = this.elements.indexOf(val)
      if (idx >= 0) {
        this.elements.splice(idx, 1)
        return true
      }
      return false
    },
    has: function(val) {
      return this.elements.includes(val)
    },
    clear: function() {
      this.elements = []
    },
    get size() {
      return this.elements.length
    }
  }

  class MySet {
    static foo = 8
    static fromArray(ary) {
      return new MySet(ary)
    }
    constructor(inits) {
      this.elements = []
      for (var i = 0; i < inits.length; i++) {
        this.add(inits[i])
      }
    }
    add(val) {
      if (!this.has(val)) {
        this.elements.push(val)
      }
      return this
    }
    delete(val) {
      if (val !== val) {
        var idx = this.elements.findIndex(it => it !== it)
        if (idx >= 0) {
          this.elements.splice(idx, 1)
          return true
        }
        return false
      }
      var idx = this.elements.indexOf(val)
      if (idx >= 0) {
        this.elements.splice(idx, 1)
        return true
      }
      return false
    }
    has(val) {
      return this.elements.includes(val)
    }
    clear() {
      this.elements = []
    }
    get size() {
      return this.elements.length
    }
  }

  // MySet2.prototype.__proto__ === Array.prototype
  class MySet2 extends Array {
    constructor(inits) {
      // super调用之前不能使用this，因为super之后this才绑定到新的对象上
      super()// Creature.call(this, a,b,c,d)
      for (var i = 0; i < inits.length; i++) {
        this.add(inits[i])
      }
    }
    add(val) {
      if (!this.has(val)) {
        this.push(val)
      }
    }
    has(val) {
      return this.includes(val)
    }
    delete(val) {
      var idx = this.indexOf(val)
      if (idx >= 0) {
        this.splice(idx, 1)
        return true
      }
      return false
    }
    clear() {
      this.length = 0
    }
    get size() {
      return this.length
    }
  }


  // UTextCell.__proto__ === TextCell
  // UTextCell.prototype.__proto__ === TextCell.prototype
  class UTextCell extends TextCell {
    constructor(text) {
      super(text)
    }
    // UTextCell.prototype.minHeight()
    minHeight() {
             // TextCell.prototype.minHeight.call(this)
      return super.minHeight() + 1
    }
    draw(width, height) {
      return super.draw(width, height - 1).concat('-'.repeat(width))
    }
  }


  function MyMap() {
    this._keys   = []
    this._values = []
  }

  MyMap.prototype.forEach = function(iterator) {
    for (var i = 0; i < this._keys.length; i++) {
      var key = this._keys[i]
      var val = this._values[i]
      iterator(val, key)
    }
  }
  // 获取一个key在_keys中的下标，需要正确处理NaN
  MyMap.prototype._keyIndex = function(key) {
    if (key !== key) { // 当key是NaN时
      return this._keys.findIndex(it => it !== it)
    } else {
      return this._keys.indexOf(key)
    }
  }
  MyMap.prototype.set = function(key, value) {
    if (this.has(key)) { // 如果映射的key已经存在
      var idx = this._keyIndex(key)
      this._values[idx] = value
    } else { // 映射的key不存在
      this._keys.push(key)
      this._values.push(value)
    }
    return this
  }
  MyMap.prototype.get = function(key) {
    var idx = this._keyIndex(key)
    if (idx >= 0) {
      return this._values[idx]
    }
  }
  MyMap.prototype.has = function(key) {
    return this._keys.includes(key)
  }
  MyMap.prototype.delete = function(key) {
    var idx = this._keyIndex(key)
    if (idx >= 0) {
      this._keys.splice(idx, 1)
      this._values.splice(idx, 1)
      return true
    }
    return false
  }
  MyMap.prototype.clear = function() {
    this._keys.length = 0
    this._values.length = 0
  }

  Object.defineProperty(MyMap.prototype, 'size', {
    get: function() {
      return this._keys.length
    },
  })
