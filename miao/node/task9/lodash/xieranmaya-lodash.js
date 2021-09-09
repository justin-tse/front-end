var xieranmaya = {
  chunk: function(arr, n) {
    var l = Math.ceil(arr.length / n)
    var result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = []
    }

    for (var i = 0; i < arr.length; i++) {
      result[parseInt(i / n)][i % n] = arr[i]
    }

    return result
  },
  compact: function compact(ary) {
    var result = []
    for (var item of ary) {
      if (item) {
        result.push(item)
      }
    }
    return result
  },
  last: ary => ary[ary.length - 1],
  first: ary => ary[0],
  indexOf: function indexOf(ary, value, start = 0) {
    for (var i = start; i < ary.length; i++) {
      if (value === ary[i]) {
        return i
      }
    }
    return -1
  },
  lastIndexOf: function lastIndexOf(ary, value, start = ary.length - 1) {
    for (var i = start; i >= 0; i--) {
      if (value === ary[i]) {
        return i
      }
    }
    return -1
  },
  identity: v => v,
  drop: (ary, n = 1) => ary.slice(n),
  dropWhile: function dropWhile(ary, predicate) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (predicate(ary[i], i, ary)) {
        result.push(ary[i])
      } else {
        break
      }
    }
    return result
  },
  reverse: function reverse(ary) {
    return ary.slice().reverse()
  },
  x: function(){
    return function bar(){

    }
  }(),
  dropRight: (ary, n = 1) => ary.slice(0, ary.length - n),
  sortedIndex: function sortedIndex(ary, value) {
    var left = 0
    var right = ary.length - 1
    while (left < right) {
      var middle = parseInt((left + right) / 2)
      if (ary[middle] >= value) {
        right = middle
      } else {
        left = middle + 1
      }
    }
    return left
  },
  invokeMap: function invokeMap(col, path, ...args) {
    if (typeof path === 'function') {
      return _.map(col, item => {
        return path.apply(item, args)
      })
    } else {
      return _.map(col, item => {
        return this.get(item, path).apply(item, args)
      })
    }
  },
  isEqual: function isEqual(a, b) {
    if (a === b) {
      return true
    }
    if (a !== a && b !== b) {
      return true
    }
    if (typeof a === 'object' && typeof b === 'object') {
      let count = 0
      let p
      for (p in a) {
        count++
      }
      for (p in b) {
        count--
      }
      if (count) {
        return false
      }
      for (p in a) {
        if (!isEqual(a[p], b[p])) {
          return false
        }
      }
      return true
    } else {
      return a === b
    }
  },
  isMatch: function isMatch(object, source) {
    for (key in source) {
      if (!this.isEqual(source[key], object[key])) {
        return false
      }
    }
    return true
  },
  get: function get(val, path, dftVal) {
    if (typeof path === 'string') {
      path = path.split('[').join('.').split(']').join('').split('.')
    }
    return path.reduce((obj, seg) => {
      if (!obj) {
        return obj
      }
      return obj[seg]
    }, val) || dftVal
  },
  property: function(name) {
    return obj => this.get(obj, name)
  },
  matches: function(base) {
    return function(obj) {
      for (var p in base) {
        if (obj[p] !== base[p]) {
          return false
        }
      }
      return true
    }
  },
  matchesProperty: function(...pairs) {
    return function(obj) {
      for (var i = 0; i < pairs.length; i += 2) {
        if (obj[pairs[i]] !== pairs[i + 1]) {
          return false
        }
      }
      return true
    }
  },
  once: (fn, called = false, result) => (...args) => !called ? (called = true, result = fn(...args)) : result,
  unary: fn => arg => fn(arg),
  negate: fn => (...args) => !fn(...args),
  spread: fn => ary => fn(...ary),
  flip: fn => (...args) => fn(...args.reverse()),
  constant: val => () => val,
  flow: fns => val => fns.reduce((val, fn) => fn(val), val),
  flowRight: fns => val => fns.reverse().reduce((val, fn) => fn(val), val),
  flatten: ary => [].concat(...ary),
  flattenDepth: function flattenDepth(ary, depth = 1) {
    if (depth == 0) {
      return ary.slice()
    }
    return ary.reduce((result, value) => {
      if (Array.isArray(value)) {
        return result.concat(flattenDepth(value, depth - 1))
      } else {
        return result.concat(value)
      }
    }, [])
  },
  flattenDeep: function flattenDeep(ary) {
    return ary.reduce((result, value) => {
      if (Array.isArray(value)) {
        return result.concat(flattenDeep(value))
      } else {
        return result.concat(value)
      }
    }, [])
  },
}