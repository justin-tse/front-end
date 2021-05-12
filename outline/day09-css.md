## Day09 CSS选择器优先级
无important且选择器优先级相同：

* 内联样式 > 网站自带样式 > 用户样式表 > 标签自带的html属性样式 > 继承来的样式

有important且选择器优先级相同：

* 内联样式 > 用户样式表 > 网站自带样式 > 标签自带的html属性样式 > 继承来的样式


无important且选择器优先级相同：

* 内联样式 > 网站自带样式 > 继承来的样式

有important且选择器优先级相同：

* 内联样式 > 网站自带样式 > 继承来的样式

>[Chrome浏览器内置样式表](
https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css)

>[Firefox浏览器内置样式表](
https://searchfox.org/mozilla-central/source/layout/style/res/html.css)