# jQuery需要注意的问题及特殊函数总结

* jQuery有哪些模块。。。
* 一次选择，多次使用
  * 不要每次使用都重新选一次，很浪费时间
* $.fn.load
* end
* data
* prop/attr
* on/off/delegate/live
* animate
  * toggle 坑
  * show/hide
  * slideToggle
  * 
* $.ajax
* $.jsonp
* ajaxEvent
  * 全局事件
  * 在windows/document上触发
* $.noConflict
* 插件开发
* 链式调用
* toggle
* hover
* live/bind
* 表单
  * $('form').serialize()
* 放置位置
* $(fn)
* clone
* select事件
  * 禁止选中文本
* 方便的ajax方法
  * get
  * getJSON
  * getScript
  * post
  * load