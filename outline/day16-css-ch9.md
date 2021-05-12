## Day16 CSS color and background
* 第九章：颜色与背景
    - color
        + 颜色 前景色（与之对应的则是背景色）
            * 一般画图工具中都有类似对应的图标
        + 默认为黑色
        + 会被子元素继承
            * 所以设定一个元素的颜色，其子元素都将是这个颜色
                - 这是很明显的(#333)
        + 会做为border，text/box-shadow的默认值
            * text-shadow: 2px 3px 3px;
            * box-shadow: 5px 10px 5px;
            * border: 10px solid;

        + css3的currentColor
            * 用在其它属性上比如bgc上，或者linear-gradient等
    - background
        + background-color
            * 背景色
                - 默认值为 transparent，即透明
            * 不继承
                - 否则会有奇怪的效果，比如如果设置了semi透明颜色，而且又继承的话。。
        + background-image
            * url()
            * 默认从padding box开始渲染（画）的
            * 背景图片无法从网页上直接复制
        + background-size
            * https://developer.mozilla.org/en-US/docs/Web/CSS/background-size#Browser_compatibility
            * cover 图片由无穷大缩小到正好覆盖元素
            * contain 图片由无穷小放大到正好被元素包围
            - object-fit
                + img
                + video等
            * 如果attachment为fixed，背景区为浏览器可视区（即视口），不包括滚动条。不能为负值。
        + background-repeat
            * background-repeat
                - repeat
                - repeat-x/y
                - no-repeat
        + background-origin css3
            * content-box
            * padding-box
            * border-box
            * 与box-sizing的关键字是对应的
        + backgorund-attachment
            * scroll
            * local
            * fixed
                - 为此值时bg-size的百分比以浏览器窗口的大小来计算
                - 可以用来做视差滚动
                - http://www.mi.com/xiaoyi/?cfrom=list
        + background-position
            * background-position-x/y
            * 雪碧图，css sprite
            * 0 0
            * center 200px
            * 100px
            * 0px 10px 相对于左上角
            * 50% 30% 相对于左上角
            * top left /// right bottom 让图片处于某个角落
            * top 20px right 50px   相对于右上角，往元素中心水平偏50px，垂直偏移20px
            * calc(100% - 50px) 从最右往多偏移50px
        + background-clip
            * xx-box
            * 平铺以后再裁剪
        + -webkit-background-clip
            * text
        + css3 多背景
            * 分开写，合并写
        + background: <bg-img> <bg-repeat> <bg-origin> <bg-clip> <bg-size> / <bt-pos> , <bg-img> <bg-repeat> <bg-origin> <bg-clip>, <bg-img> <bg-repeat> <bg-origin> <bg-clip> bg-color;
        + 应用
            * 伪元素里的图片，
            * css sprite
            * 动画，菜单，小米网首页logo动画
            * 视差滚动：小蚁摄像机页面效果，Nike活动页面效果
            * 多背景做花纹
