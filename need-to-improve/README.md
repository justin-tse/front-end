# Be careful
## Week01～02 homework
1. 路径问题,要注意，相对，绝对等，网页和cli是有区别等，网页一般会先把url后面部分处理掉再接上我们写的路径,同时style引用的CSS样式大部分时候会需要同时引用图片，需要根据路径补上
2. HTML需要注意标签语义问题，不能随意套用关系，一般只能在最底层级才可以放其他标签。如`<table>, <dl>`等，只有在最子级标签
`<td>,<dd>`里才能套用如<div> 等
3. 选择器的问题
    1. `:nth-child(-n + a)`注意到这样的表达式可以表示a以内的
    2. `:nth-child(n + b)`注意到这样的表达式可以表示b以上的
    3. 结合上述两者可以实现`[a, b]`的元素