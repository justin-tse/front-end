var nameInput = document.querySelector('.name')
var messageInput = document.querySelector('.message')
var messagesDiv = document.querySelector('#messagesDiv')

function liuyan() {
  // 获取表单数据，发请求
  event.preventDefault()
  var name = nameInput.value
  var message = messageInput.value

  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/liuyan')
  xhr.onload = function() {
    nameInput.value = messageInput.value = ''
    // var div = document.createElement('div')
    // div.textContent = name + ' - ' + message
    // document.body.append(div)
    init()
  }
  xhr.send('name=' + name + '&message=' + message)
}

function init() {
  messagesDiv.textContent = ''//清空div

  var xhr = new XMLHttpRequest()
  xhr.open('get', '/messages')

  xhr.onload = function(e) {
    var messages = JSON.parse(xhr.responseText)
    for (var i = messages.length - 1; i >= 0; i--) {
      var msg = messages[i]
      var div = document.createElement('div')
      div.textContent = msg.name + ' - ' + msg.message
      messagesDiv.append(div)
    }
  }

  xhr.send()
}

init()
