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


function assert(flag) {
  if (!flag) {
    throw new Error('lsdfwe')
  }
}

describe('Constructor of MyMap', function() {
  it('should return an instance of MyMap when called with new', () => {
    var m = new MyMap()
    assert(m instanceof MyMap)
  })
  it('should return an instance of MyMap when called without new', () => {
    var m = MyMap()
    assert(m instanceof MyMap)
  })
})


describe('MyMap#methods', function () {
  it('#set', () => {
    var m = new MyMap()
    m.set(1, 2)
    assert(m.size == 1)
    assert(m.get(1) == 2)
  })
  it('#get', () => {
    var m = new MyMap()
    m.set(1, 2)
    assert(m.size == 1)
    assert(m.get(1) == 2)
  })
  it('#delete', () => {
    var m = new MyMap()
    m.set(1, 2)
    assert(m.size == 1)
    assert(m.get(1) == 2)
  })
})
