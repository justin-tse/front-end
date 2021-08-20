# jQuery



* jQuery是什么？
* jQuery是一个操作dom的库，就像lodash是一个操作js数据的库一样
* 因为常见的dom操作都要使用【非常难用】的原生api来实现
* 任谁都会想要把这些很难使用的api封装成简单易用的
* 而这件事，在2006年就已经有人做了，他就是John Resig
* 当时的JS库不只jQuery一款，但到目前为止，只有jQuery还在被所有人用
* Prototype.js, Dojo.js, Mootools.js, Ext.js, YUI.js
* jQuery发明了使用css选择器来选择元素的语法
* jQuery提供了极其方便易用的api让你可以操作dom
* 尤其是其【链式调用】和【批量处理】
```js
var ps = document.querySelectorAll('p')
Array.from(ps).forEach(p => {
  p.addEventListener('click', function(){

  })
})

$('p').click(function(){
  
})

$("button").click().dblclick().css().animate().

$("button").click(function(){
  $("p").toggle()

  $("div").animate({
    width: 100,
    height: 200,
  }, 1000, 'linear', function(){

  })
})

$("div")
  .click(fn)
  .mouseover(f2)
  .mouseout(f3)


```
* 在css3之前，jquery另一个被广为使用的特性是动画.animate()
* vanilla.js
* 在 jQuery 中，链式的 DOM 操作甚至可以看做 DSL（Domain Specific Language）
* 图灵完全 Turning Complete
* 图灵测试 Turning Test
* 什么是DSL？
  * 比如
  * 数学语言
  * css语言
  * markdown语言
  * 模板引擎
  * css选择器
  * 正则表达式
  * JSON
  * 测试框架的assert： isPrime(17).should.to.be(true)
* jQuery目前已经进化到3.x版本了
  * 1.x版本一直支持到ie6
  * 趣事：
    * $('div').live()
    * <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    * https://blog.jquery.com/2014/07/03/dont-use-jquery-latest-js/
    * 使用上面这个地址可以随时访问到jquery的最新版本
    * 但目前它被锁定在了1.11.1版本，不再更新
    * CDN Content Devilier Network 内容分发网络。
      * 负载均衡 load balance
      * 智能dns
      * 击穿
    https://img.alicdn.com/tfs/TB1erX9SXXXXXbNXVXXXXXXXXXX-520-280.jpg_q90_.webp
  * 2.0版放弃支持IE8及以下的浏览器
  * 3.0则有两个分支，事实上这个升级是为了符合semver（语义化版本号）
    * 主.次.补
      * 补：修bug，完全不改变api
      * 次：增加api，不改变当前主版本号下的原有api
      * 主：有break change，
    * 一个是jQuery Compat 3.0，它实际上1.x的升级版本，所以是兼容ie8及以下的浏览器的
    * 一个是jQuery 3.0，它是2.x的升级版本
* 方便的插件系统，开发者可以方便的给jquery编写插件
* 在AVR之前，很多【功能组件】都是以jquery插件的形式存在的。
```html
<script src="jquery.min.js"></script>
<script src="jquery.slider.min.js"></script>
<script src="jquery.calendar.min.js"></script>
<script>
  $('div.slider').slider()

  $('input').calendar()
</script>
```

* 对于很多人来说，它比js还要简单，相当多的人入门js是从jQuery开始的
* 如何使用？
* <script src="jquery.js"></script>
* OR
* <script src="jquery.min.js"></script>
* $ === jQuery
* 以上两种方式有什么区别？
  * 前者加载的是非混淆版本，后者是混淆版本
* 配套的库：
  * Sizzle
  * jQuery UI，用于实现一些常用的ui组件比如日历选择器
  * jQuery Mobile，用于在移动端实现一些常用的交互和UI，事实现在很少有网站使用jQuery Mobile来实现移动端页面
* jQuery的几大块内容：
  * 选择器
  * 属性操作
  * DOM操作
  * 遍历函数
  * 事件绑定，代理等
  * 动画
  * AJAX
  * 其它Helper Functions
* 反对jQuery的声音
  * You may not need jquery
* 实现一个jQuery插件
  * Slider
  * Tab
  * Pager
  * Select
  * DatePicker
  * Modal


















* 填坑：flex image
