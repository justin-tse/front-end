# Day07
* table标签
    - 这个标签以前经常用于做布局
        + 什么是布局？即页面大区块的排列和摆放
        + 为什么呢？因为table都是方方正正格子，了解后很容易控制
            * 语义很差
            * 可读性很差
            * 可维护性也很差 maintainable
            * 可访问性
        + 但现在有了 css 之后，基本上只用table来显示数据，即表格本来的作用
        + 熟悉 DIV+CSS 布局 JD Job Description
* caption
    - 表格标题
* thead
    - 表头
    - 做为table的直接子元素
    - 只能有一个
    - 只有一个的情况下，即使出现在tbody的后面，其内容也会显示在tbody的前面
    - 非要写多个的话，第一个以外的会当做tbody来处理
* tbody
    - 表格主体
    - 做为table的直接子元素
    - 可以有多个
* tfoot
    - 表尾
    - 做为table的直接子元素
    - 只能有一个
    - 只有一个的情况即使出现在tbody的前面面，它的行也出现在tbody的后面
    - 非要写多个的话，第一个以外的会当做tbody来处理
* tr
    - table row cell
    - 表格行
    - 可以直接做为table的子元素，会被放入创建的tbody里面
    - 或者做为上面三个标签(thead/tbody/tfoot)的子元素
* th
    - table header cell
    - 用在表头单元格
    - 文字默认为加粗
    - id用于被td元素引用以表示td所属的标题是哪一个
        + 看例子
* td
    - table data，表格数据单元格
    - headers
        + 表格头，值为某th的id，以表示这个数据的名称
            * 方便读屏软件
        + headers的值可以是多个以空格分隔的th标签的id的值，用法可能是th或td单元格跨行或跨列了
    - 跨行跨列的单元格
        + col span 跨列
        + row span 跨行
        + 错误的示范：
        + http://www.splaybow.com/html-table-rowspan-colspan.shtml
    - http://jsbin.com/nikifi/edit?html,output
    - http://jsbin.com/yehecez/edit?html,output
    - http://jsbin.com/susomoh/1/edit?html,output
* col/colgroup 标签
    - colgroup
        + 用来分组col标签
        + span属性，表示选择多列表格
        + 有span时，不可再有子的col元素
        + 大部分属性同col元素
    - col
        + 用来设置表格列的属性和样式
        + span属性，表示选择多少列表格列，默认为1
    - 可以单独使用，也可以被colgroup分组
        ```html
        <table>
            <caption>表格标题</caption>
            <col>
            <col>
            <colgroup></colgroup>
            <colgroup></colgroup>
            <colgroup bgcolor=red>
                <col>
                <col bgcolor=navy>
            </colgroup>
            <tbody>
            <tr bgcolor="red">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        ```
    - 必须出现在caption后面，thead/tbody前面
    - 很多属性不支持了
        + 而w3schools上面还列着
        - http://www.w3school.com.cn/tiy/t.asp?f=html_col_test
* 其它
* border-spacing CSS属性, spacing是重合的
* cellspacing=0
* tr或者td or th不能有其它并列标签,否则会识别错误
    * 有些元素的 position:relative 无效，见下
    * https://stackoverflow.com/questions/6746175/html-tr-tag-and-positionrelative
    * box-shadow 也不支持某些类型的元素
    * https://stackoverflow.com/questions/10874985/box-shadow-on-table-row-not-appearing-on-certain-browsers




* map
    - 不是“地图”标签，是“映射”标签
    - name属性
    - 如果设置id属性的话，id跟name属性值必须一样
        * <input type="radio" name="a" id="a1">
            <input type="radio" name="a" id="a2">
            <input type="radio" name="a" id="a3">
            <input type="radio" name="a" id="a4">
            <input type="radio" name="a" id="a5">

* area
    - 必须做为map的子元素
    - w3school上的错误示范：http://www.w3school.com.cn/tags/att_img_usemap.asp
    - 属性
        + href
        + target
        + alt
        + 以上三个属性同a标签
        + shape
            * rect(angle)，矩形
                - x1,y1,x2,y2
            * circle，圆形
                - cx,cy,r
                - 圆心x，圆心y
                - 半径r
            * poly(gon)，多边形
                - 至少6个值，表示一个多边形的若干个顶点
        + coords coordinate
            * 对应shape的几种图形的坐标
        + code
            ```html
            <img title="image title" src="https://drscdn.500px.org/photo/174778125/m%3D1170_k%3D1/2841ccf2a3720e8e794a6a6930f6ff2c" width=300 usemap="#somemap" alt="">

            <map name="somemap">
            <area shape="rect" coords="55,108,205,200" href="https://www.mi.com/" alt="ieksoef" title="abc" target="_blank">
            <area shape="circle" coords="133,262,90" href="" alt="">
            <area shape="poly" coords="57,82,8,265,163,397,225,256,187,83" href="" alt="">
            </map>
            ```


* iframe
    - inline frame 内联窗体
    - 必须有开始标签和结束标签
        + 可以在标签之间写上不支持此标签时的退化（fallback）内容
    * 各种属性
        - src
        - name
            + 提及a标签的target属性
                * _self, _blank
                * _top, _parent
                * 自定义名字
            * 以前常用来做导航
            * base, a, form, img + map>area
        - sandbox
    * webview
    * 它的跳转记录也会存在于浏览器的前进后退的记录里面
    * code
        ```html
        <p>this is frame 4</p>
        <iframe src="frame3.html" frameborder="1">
        your browser don't support iframe
        </iframe>
        <p>this is frame 4 </p>
        ```
        ```html
        <p>this is frame 3</p>
        <iframe src="frame2.html" frameborder="1"></iframe>
        <p>this is frame 3 </p>
        ```
        ```html
        <p>this is frame 2</p>
        <iframe src="frame1.html" frameborder="1"></iframe>
        <p>this is frame 2 </p>
        ```
        ```html
        <a href="http://mi.com/" target="_top">mi</a>
        ```


* frameset&frame
    - rows/cols="10%,50px,*"
    - noframes
    - code


        ```html
        <iframe src="">
        <p>您的浏览器不支持iframe，请升级</p>
        </iframe>

        <frameset rows="100px,*,100px">
        <frame src="https://www.jd.com/">
        <frameset cols="50,50">
            <frame src="https://www.jd.com/">
            <frame src="https://www.jd.com/">
        </frameset>
        <frame src="https://xieranmaya.github.io/">
        </frameset>

        <noframe>您的浏览器不支持框架</noframe>
        ```

        ```html
        <frameset>
            <frame>
        </frameset>
        <noframes>您的浏览器不支持框架</noframes>

        <canvas>
        <p>no supported</p>
        </canvas>

        <script>
        var a = 8
        </script>
        <noscript>your browser dont support javascript!</noscript>

        <iframe src="" frameborder="0">
            <p>no supported</p>
        </iframe>

        fallback 退化方案
        degrade 降级方案
        backdrop 备用方案

        <script>
            alert()
        </script>
        <noscript>
        <p>woiejflksdjafoiw</p>
        </noscript>
        ```
* HTML 实体
    - HTML Entity
    - 以&开头以;结尾的字符串，可以用来表示任意字符串，主要用来表示不能明文出现在代码里的，比如回车，引号，<>号等
    - &与;中间可以写关键字如amp，lt，gt等表示一个实体
    - 也可以直接写某个字符的编码，两种写法
        + &#97; 10进制数表示对应字符的编码
        + hexdecimal 十六进制 hex
        + &#x0000A; 16进制数表示对应字符的编码
        * unicode
            * 我 25105 &#x6211;
            * e68891
            * 以前
            * 不同国家对自己的字符分别编号
            * 日本  X  1000
            * 中国  我 1000
            * 现在
            * 让全球所有国家的所有字符
            * 在同一个编码环境编号
    - 此处普及16进制与字符编码
        + gb2312 国标
        + gbk    国标 扩展
        + 内码
            * 我
                - gb2312
                    + 323
                - unicode
                    * 25105
                - jp6748
                    + 323
        + 输入码
            * 我
                - wo 拼音
                - q 五笔
        + uni code
            * 包含了全世界所有的字符
            * 给每一个字符指定了一个编码
    - 4个符号被html定义为保留字符(或者可以理解成控制字符)，浏览器遇到它们的时候会把它们当做页面的控制字符
        + &
        + <
        + >
        + "
    - 这4个字符想要以可见的形式出现在页面里面，都需要用实体来表示，它们的实体分别对应
        + &amp; ampersand
        + &lt; lettle then
        + &gt; greater then
        + &quot; quote
        + &apos;
    - 但并不只有这几个字符可以转义，理论上所有的内容都可以以实体的形式表示
        + https://dev.w3.org/html5/html-author/charref
    - 常见的其它html实体
        + &nbsp; 非合并空格
        + &copy; copywirte版权符号，一个圆里面一个C
        + /
        + :
        + =
        + ?
        + http://www.baidu.com/s?wd=love&url=http://jd.com/?s=taobao


* div division 没有语义的标签
* <div class="footer"></div>
    <div class="header"></div>
    <div class="sidebar"></div>
    <div class="navigation"></div>
    <div class="wrapper container">

    </div>
    <div class="content"></div>
    <div class="main"></div>

    <article></article>
    <div class="article"></div>
* HTML5 新增的一些语义标签
    - <article></article>  <div class="article"></div>
    - section  div
    - aside
    - header
    - footer
    - nav(igate)
    - main
    - template 模板
    <table>
    </table>
    - <textarea>
        <span></span>
        <h1></h1>
        </textarea>
    - <script xtype="text/template">
        <h1></h1>
        <textarea></textarea>
        </script>
* 其它常见标签
    - sub
    - sup
    - code
        + 与pre不一样，不过一般与pre一起，用来显示代码块
        + <pre><code>code  goes here</code></pre>
* script
    - `<script>js goes here</script>`
    - `<script src=".././.././less.js">js not allowed</script>`
    - 遇到`</script>`就结束
* style
    - <style>css goes here</style>
    - <style src='a.css'>css goes here</style> xxx
    - <link rel="stylesheet" href="a.css">
* 多媒体标签
    - video 视频
        + mkv xxx
        + rm rmvb xxx
        + avi xxxx
        + mp4 supported h264 / h265
        + m3u8 supported
            * m3u8 list
            * xxxx.m3u8
            * 0 6   http://wa.com/a.mp4
            *
        + webm webp
        + mpg  jpg
    - audio 音频
        + mp3 ogg m3u8 wmv wav
    - usage
        ```html
        <video autoplay loop preload controls>
            <source src="a.mp4" >
            <source src="a.m3u8" >
            <source src="a.webm" >
            您的浏览器不支持video
        </video>
        ```
    - flv.js
    - 自动播放属性 autoplay
    - 循环属性 loop
    - 预加载属性 preload
    - 控制条属性 controls
* object 东西，对象
    * type属性
        * MIME Type image/png, video/webm
        * application/pdf
    * iframe
    * pdf
    * svg,img
    * flash
    * 300*150 跟iframe一样
* embed 嵌入
* canvas
    - 画布
    - 必须有结束标签，内部写上不支持canvas的浏览器的提示性文字
        + `<canvas><p>您的浏览器不支持canvas</p></canvas>`
    * width/height 属性与css的width/height是不一样的
        * 如果不同的话图片会被拉伸
    * 默认是透明的
* progress
    * max
    * value
    * http://www.zhangxinxu.com/wordpress/2013/02/html5-progress-element-style-control/
    * 下面这篇更好
    * https://css-tricks.com/html5-progress-element/

+ 标签文档
    * https://developer.mozilla.org/en-US/docs/Web/HTML/Element
        * tt
        * kbd
        * address
        * q
        * blockquote
    * w3school
        * 错误
        * 内容老旧
        * 内容不全面
        * 商业网站
    * w3fool
        *

+ doctype Document Type Delclearation
    ```
    document type declearation
    <!doctype html //STRICT/html.dtd>
    <!DOCTYPE html> 让浏览器以最新的标准来解析这个页面
    ```
    * html5????   CSS(CSS2 + CSS3)
    * H5   C3
        * 对于外行来说
        * 往往指的很炫酷的网页
    * HTML5
        * 到目前为止，所有的前端技术集合
        * es6，css3，html5，新的浏览器功能（API）
    * 如果不写doctype声明，页面在IE浏览器下会以quirkmode（怪异模式）渲染
        * IE6时引入
        * 最主要的区别是css盒模型计算方面
+ meta
    * encoding
    * viewport
    * keywords
    * author
    * description
+ link
    * 引入 css
    * 引入 页面的图标
    * favicon.ico
+ 语义化
    * 语义化做的好的页面能够方便人与机器的理解
    * maintainable能够让团队的后来者更易于维护代码（可维护性）
    * 能够让页面在搜索引擎的结果中更靠前（让机器更易理解）
    * 合适的内容选用合适的标签
    * 合理使用h，p，列表，表格，div，span及html5新增语义标签
    * 使用合适的嵌套
    * <button><p></p></button>
    * <p><div></div></p>
    * <a><button></button></a>
    * 给元素命名上合适的类名及id名称
    * css裸奔节

* 标签的分类：
    * 曾经：
    * 块级元素 h1234, div, p, ul,li
    * 行内元素 span a em strong i b
    * 现在：
    * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories
    * div > a > div > p > span > a
    * div span a b u strong em
    * ul li ol dt dl dd table*
    * form input textarea
    * img
    <div>
    <a href="">
        <div></div>
    </a>
    </div>

    读屏软件可以理解/识别传统软件的常见视觉元素
* role 与 aria-*
    * accessible rich Internet Application （可访问的 富 互联网应用）
    * rich text format
    * 视觉元素
    * 由来
    * UI控件/组件
    * web app
        * rich application
        * 任何能用js实现的软件最终一定会用js实现
    * role
    * role="textbox"
    * role="listbox" -> select
    * role="option" -> option
    * role="progressbar" -> progress
    * role="tabs" -> 选项卡
    * aria-*
    * aria-disabled="true"
    * aria-checked="true"
    * aria-valuenow="true"
    * aria-valuemax="true"
    * aria-valuemin="true"
    * aria-readonly="true"
    * aria-selected="true"
    * <div role="checkbox" aria-checked="flase">
    <input type="checkbox" >
    * 一般来说，role与aria-*用在非语义标签上
    * 如div，span，li，a等
    * 不用在如nav，article，footer等标签上
        * 以及select，input
    * 文档：https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
+ sublime
    * 快捷键
    * 对快捷键的使用是判断一个程序员水平的重要标准
    * 编辑设置项
    * Sublime的设置项在哪？？
    * package control
    * Color Highlighter red
    + emmet
    + ColorHighlight
    * DocBlockr
    * sidebarenhancements
    * Ctrl + Shift + P



+ git 短命令与远程操作

+ Dev Tools开发工具初探
