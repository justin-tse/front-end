// 面试题实现EventEmitter

// class EventEmitter2 {

// }

// var et = new EventEmitter2()

// et.on('foo', (a) => { console.log(a) })

// et.emit('foo', 1)

class EventEmitter {
  constructor() {
    this._listeners = {}
  }
  on(eventName, eventHandler) {
    if (!(eventName in this._listeners)) {
      this._listeners[eventName] = []
    }
    this._listeners[eventName].push(eventHandler)

    return this
  }
  off(eventName, eventHandler) {
    var handlers = this._listeners[eventName] || []
    for (var i = 0; i < handlers.length; i++) {
      if (handlers[i] == eventHandler) {
        handlers.splice(i, 1)
      }
    }
  }
  once(eventName, eventHandler) {
    this.on(eventName, function f(...args) {
      this.off(eventName, f)
      eventHandler.call(this, ...args)
    })
  }
  emit(eventName, ...eventArgs) {
    var handlers = this._listeners[eventName] || []
    for (var handler of handlers) {
      handler.call(this, ...eventArgs)
    }
  }
}


class Writable extends EventEmitter {
  constructor() {
    this.highWaterMark = 20
    this.buffer = []
    this.bufferTotalLength = 0
    this.consumeDone = () => { // 一份数据消耗完的时候
      if (this.bufferTotalLength == 0) {
        this.emit('drain')
      } else {
        this._write(data, this.consumeDone)
      }
    }
  }
  write(data) {
    this.buffer.push(data)
    this.bufferTotalLength += data.length
  }
  _write(data, callback) {

  }
}


var w = new Writable()

w.write('xxx')

w.on('drain', () => {

})
