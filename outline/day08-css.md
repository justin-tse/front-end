# CSS 课程大纲

* 买书：css权威指南第三版，the book of css3第二版，JavaScript编程精解，Eloquent JavaScript

* HTML的默认样式并不好看，如何才能做出漂亮的界面（User Interface）呢？
* 以前（现在也），标签的属性可以给该标签提供一定的样式：
* 甚至是一些标签本身就自带样式，如 center
* 如body,table标签
  ```html
  <body link="aqua"
        a(ctive)link="red"
        v(isited)link="grey"
        background="bg.jpg"
        bgcolor="yellow"
        leftmargin="10%"
        bottommargin="100"
        text="green">

        <p><font color=red face="" size="">The quick brown</font></p>
        <p><font color=red face="" size="">The quick brown</font></p>
        <p>The quick brown</p>
        <h1></h1>
        <p>The quick brown</p>
        <p>The quick brown</p>
        <p>The quick brown</p>
        <p>The quick brown</p>
        <p>The quick brown</p>


    <em>foo bar <u>bazzz</em> lwjeof jowef</u>

    <a href="">fox jumps over</a>
    <center></center>
    <table
       <%  include('table-style.txt') %>
        >
        <col>
        <tr>
            <td>001</td>
            <td>002</td>
            <td>003</td>
        </tr>
        <tr>
            <td>001</td>
            <td>002</td>
            <td>003</td>
        </tr>
        <tr>
            <td>001</td>
            <td>002</td>
            <td>003</td>
        </tr>
        <tr>
            <td>001</td>
            <td>002</td>
            <td>003</td>
        </tr>
        <tr>
            <td width="200">001</td>
            <td>002</td>
            <td>003</td>
        </tr>

    </table>
    <img src="" width="50%">
  </body>
  ```



* 但是存在很多问题，例如
    * 可以控制的样式太少
        * color
        * bgcolor
        * width
        * border
        * 等
    + 以及违背了DRY原则（Don't Repeat Yourself）
        * 我们只是Github的搬运工
    * 即只对为其写样式的标签有效，想要给多个标签上样式，就得写在多个标签上面
        * 比如想要让所有的段落都成红色，就得在每个p标签上加上color=red
        * 而使用css，`p {color: red;}` 就可以让所有的段落都变成红色
    * 样式不能夸页面复用，跟上一条类似
        - 虽然使用一些服务端的技术可以达到标签属性的样式复用目的，但是流量依然会有所浪费（p12）
            + 而使用css，同一个站点的多个页面可以共享一个css文件，会显著的节省流量，因为只会下载一次
                * 然而，很可能使用了css后流量会上升，因为会你会写很多的css，而一般并不会在html标签上加很多样式
                * 安迪·比尔定律 硬件提供了多少能力，软件就会使用多少能力
                * 摩尔定律 硬件的能力每18个月*2，价格减半
        * 使用css，一个css文件可以同时被多个不同的页面使用
        * 同时因为缓存，还能起到减少网络流量的目的
    * 各种度量单位不能选，只能以像素和百分比为单位
        * px rem em ch ex vh fr in cm mm %
    * 甚至连透明都实现不了
    * 样式各种单一
        - 比如所有的链接只能有一个颜色，等等
            * 当然，可以包在font标签里实现多色。。。
            * <a href=""><font color="blue">download</font></a>
    * 无法灵活实现布局
    * 或者很多效果用图片实现
        * <input type="image" src="button.png">
        * 可维护性很差
            * 什么叫可维护性？
                * 即修改以及被他人理解的难易程度

* 没有银弹

* CSS to the RESCUE
    - 什么是CSS？
        + Cascading Style Sheet
        + 层叠 样式 表
            * 层叠在这里是什么意思呢？（p12）
                * 冲突处理
                    * 不是代码合并冲突
                    * 而是说对同一个元素指定了不同的样式，哪一个生效
                * 样式是可以继承的
    * CSS能在哪些方面对UI的实现做出提升呢？
    * 更多类型的样式
        * 如背景图片
        * 阴影
        * 内外边距，边框
        * 各种各种
    * 方便的控制页面的布局
        * 原来是用table
    * 更精细的样式
        - CSS的属性高达上百个，可以控制页面上几乎**任意一个像素**
    * Desgined for UI，专为UI开发设计（一般来说现在的平面设计专业也会学习CSS）
        * 在传统的软件开发中，UI是个很麻烦的问题
        * 但CSS的出现解决了这一问题
            * C++ QT
            * 以至于有不少非web平台（如qt）也开始支持css的一部分子集了
            * 微信小程序 wxml wcss js
            * FireFox 的 chrome （自身UI）
    * 更易用
        * 比传统软件中的UI开发方式更易用
        * 比在html标签里使用属性直接给标签增加样式更易用
        * 可以方便的给**一组标签**使用样式
            * p,h1,h2 {color: red;font-size: 25px;}
        * 也可以方便的给任意标签增加和删减样式
    * 一个样式表可以用于多个页面
        * 因为复用，于是减少了文件体积
    * 层叠，继承
        * 样式可以覆盖
        * 样式有优先级
        * 样式还可以继承
            * 什么叫继承？
    * 为未来着想
        * 这句是在CSS权威指南书写的时候说的
            * 当时w3c已经意识到给标签加上一些样式的属性不是一件好事，不利于表达语义（因为html更多的是结构和语义），所以开始慢慢的在标准中不推荐直接给标签写样式属性
                * <p><font color="" face>lasdkjf</font></p>
            * 意味着未来，直接给标签写样式会和不到更多的浏览器支持
    * css zen garden



* CSS初探
    * 想要让所有段落的文字显示成红色，并且字号为24px
      ```html
      <!--  -->
      <style>
      /*selector 选择器*/
      /*rule block 规则块*/
      /*rule*/
      /*prop-name*/
      /* prop-value */
          p {
            color: red;
            font-size: 25px;
            //px是一个长度单位，后面会解释
            font-weight: bold;
          }
      </style>
      <h1>Does it work?</h1>
      <p>The quick brown fox jumps over the lazy dog.</p>
      <p>The quick brown fox jumps over the lazy dog.</p>
      <p>The quick brown fox jumps over the lazy dog.</p>
      <p>The quick brown fox jumps over the lazy dog.</p>
      <p>The quick brown fox jumps over the lazy dog.</p>
      <div>it works!</div>
      ```

* 元素（即html标签）的层级关系
    * 嵌套/层叠/树形/递归/自相似/分形结构
        - 子元素 child
        - 父元素 parent
        - 兄弟 siblings
        - 后代 descendants
        - 祖先 ancestor
    * 替换元素与非替换元素  replaced element non-replaced element
        * <p>你在哪</p>，h123445,div,span,a,i,strong,em
        * select input textarea
        ```
        * <img src="a.jpg" />
        * <video src="a.mp4">
            <source />
          </video>
        * <audio src="a.mp3">
            wliejfoiwjef
        </audio>
        * <iframe src="http://www.mi.com/" frameborder="0">
        </iframe>
        * <input type="checkbox" name="" id="" />
        * <input type="radio" name="" id="" />
        ```
        * 替换元素 replaced elements
            * 替换元素是没有后代元素/标签/结点的
            * 替换元素是指其内容被其它不在文档里的内容替换了的元素，如：
                * img
                * radio
                * checkbox
                * input
                * iframe
                * canvas
                * object
                * video
                * audio
        * 非替换元素 non-replaced elements
            * 其它大部分元素都是非替换元素
            * 其内容直接出现在其标记中
    * 元素的显示角色 display role (不是html5里role/aria-*属性)
        * 布局上下文 布局模型 布局方式
        * 块级元素 block element
            * 块级元素会占满父元素的宽度，不会让其它元素在它的旁边
                * p，h1-6，div, nav, header,footer,main,aside,section,article等默认都是块级元素
                * 所以`the <p>quick brown fox</p> jumps over the lazy dog.`会呈现为3行
            * 替换元素可以为块级，但一般不是这样
            * display属性可以改变元素的显示角色
                * inline
                * block
        * 行内/内联/行间 inline element
            * 即在一行文字内产生的元素框
                - 典型的比如a，em，strong,i,b,u,span标签都是行内元素
                - 它们不会在其前后产生换行于是也就不会打断所在行的文字
            * 在以前某些版本的html中，默认情况下内联元素是不能做为默认情况下块级元素的祖先元素的
                * <a href="">
                    <div></div>
                  </a>
                - 但在css中，并没有这个限制
                - 况且css可以改变元素的显示方式
                - 另外 ，在html5中元素并不只区分为块级与内联，而是分为如下几个大类
                    + flow
                    + pharsing
                    + transparent
                    + meta content
                    + section
                    + heading content
                    + embed
                    + intereactive
                    + https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories

    * 如何让css在html上起作用
        * style标签
            - `<style>p {color:red;}</style>`
        * link标签
            - `<link rel="stylesheet" href="print.css" media="print">`
            * media 属性，显示介质
            * media query
                * all
                * aural 听觉的
                * handheld 手持设备
                * print 打印设备
                    * 典型场景：打印时在链接的后面写上地址
                * projectioin 投影设备
                * screen
                * tty
                    * 字符显示设备/终端
                * tv
                * 可用逗号分隔这些属性值：
                    * media=“screen,tv”
        * 内联样式
            - `<div style="color:red;font-size:45px;"></div>`
        * DOM
            - `el.style.color = 'red'`


    * @import指令
        * 必须出现在文件头/顶部
        * 否则的话会被忽略
        * @import "../aa.css";
            - 在css里用的时候路径是相对于**这句代码所在的css文件**
        * style标签里也可以用import
            - 但需要注意import的路径问题，是相对于当前html文件的
            - 一般来说一个文件内出现了相对路径，都是相对于这个文件所在的文件夹的
        * @import语句会形成一个树状依赖
        * 并不常用
            * 因为会导致串行下载，串行下载太慢
    * css文件的注释
        * `/*  */`
        * css虽然只支持这一种注释风格，但是利用css的解析规则，我们可以有很多方式注释它
            - 如果这一行解析不成功，浏览器会直接忽略它
            - 所以以任意破坏这一行的内容开头就可以了
                + `//color:red;`
                + `colors: red;`
    * 内联样式
        * style="//xcolor:red;xtext-indent: 2em;"
        * 内联样式也可以用上面提到的注释
            - 但因为没有换行，所以是不能使用//这种注释的
            - 不过可以通过改变一下属性名以达到注释的目的
            - 不过还是不推荐这种做法
            - 因为这样写的话相当于css有语法错误




* 选择器
    * 基本规则
        * selector ｛
            声明/属性:


            值;
            color: red;
            font-size: 24px;
            margin: red;
        ｝声明块
        * selector {
            prop:value;
            prop1:value1;}
        * 对应书本图片：p24页
    * 声明与关键词
        * 声明中的属性必须是css所支持的属性，否则将会被浏览器忽略
        ```css
            div {
                center: yes;
                center: yes;
                颜色: 高级黑;
                color: 高级黑;
                colour: red;
                font-size: 28px;
                font-size: red;
                font-is-large: true;
            }
        ```
        * 声明的值也必须是**对应属性所支持的**，否则整条声明同样是无效的
        * color: 100;
        * DevTools 中可以看到以下提示
            * unknown property
            * invalid value
    * 想要把同一组属性应用于多种元素
    * 选择器分组
        * p,div,h1 { color: red; font-size: 20px; border: 5px solid; }
        * `* {color: red;}`
        * 通配选择符*
        * image/*
    * 规则分组
        * 一个选择器里可以写多条规则
        * 一条规则以一个分号结束，否则不生效
        * p30页例子
        * 最后一条规则可以不写分号，但最好还是写上
    * 标签/元素选择器 element selector
        - `element {rules}`
        - div {}  p {} span {}  abc {}
        - * {color: red;}
        - <div></div>
        - <abc></abc>
    * 类选择器与id选择器
        - <div class="foo error def ghi"></div>
        - <p class="foo error "></p>
        * 类选择器
            * div.foo
            * .foo
            * .foo.error.ghi
            * .foo
            * *::selection
            * *:target
            * 简写为   .classname
            * 复合 类选择器
                * p.class1.class2
                    * <p class="class1 class2 lsdkfj lksdfj"></p>
                * p.a.a {color: red;}
                * p.a {color: blue;}
                * ie7之前不支持这种
                    * 只会有最后一个类生效
                        * p.a.b 相当于 p.b ; p35页
        * id选择器
            -   <p id="thep"> </p>
            * #thep {color: red;}
            * #th#ep
            * [id="th ep"]
            * 不存在复合id选择器。。。因为一个元素只能有一个id
            * 而且id选择器是不按空格分隔的
            * p.a.b.c#foo
            * #thevalueofid {a:b;}
            * p,P {color:red;}
            * span {color:yellow}
        * 用id还是用class选择器
            * id是一次性的，只出现一次
            * class是多处可用，可以复用的
            * 另外id选择器是不支持空格分隔的id列表的，不像class，p36页
            * id选择器优先级更高
            * 大小写敏感的，.p,.P是不一样的。但有些老浏览器不敏感
            * #p,#P
            * .error {color:red;}
    * 属性选择器
        * 7种属性选择器
        * 存在某属性
            * [attr] {}
        * 存在多个属性，chaining
            * p[attr1][attr2]
            * [attr1][attr2]
        * 属性名与值同时匹配
            * p[attr="abc"]
            * p[class="abc def"] vs p.abc 不一样 p41页
            * .class2 .class2 {
            * }
        * 空格分隔的属性值列表
            * [attr~="abc"]
            * .abc == [class~="abc"]
            * 这个有什么作用呢？它可以用在任何属性上面而不是只在class属性上面
        * 属性值不区分大小写
            - <a href=".PDF"></a>
            * [attr~="abc" i], case insenstive
            * .a.b {}
            * [class~="a"][class~="b"] {
            }
        * 值以指定内容开头
            * [attr^="abc"] caret
            * 应用：为所有email链接加上特定的样式
            * a[href^="mailto:"]
            * a[href^="tel:"]
            * a[href$=".doc"i]
        * 值以指定内容结束
            * [attr$='abc']
            * 应用：为所有不同类型的下载链接加上不同的样式，如pdf文件加上其对应的图标
        * 值的任何位置包含指定内容
            * [href*='.google.'] {color: red;}
            * <a href="http://www.baidu.com/l.google.akdf/adsfal"></a>
            * 应用：选择某个域名的链接；不过强度不够，因为无法保证链接的其它部分不出现host中的内容。
        * 属性值前缀选择器
            * [lang|='zh']
            * 选择attr值 为abc 或者 以“abc-”开头 的元素
            * [lang|="zh"]
            * 应用：选择语言：<html lang="en"><html lang="en-US">
            * p43页
    * 选择器的作业
        * 给定一个文档，用不同的选择器实现不同的位置的文字样子不一样。。。
    * 选择 类名 以 bs- 开头的元素。
        *
    * 文档结构
        * 祖先元素 ancestor
        * 后代元素 descendant
        * 单层前后元素
            * 父元素 parent
            * 子元素 child
        * html元素是所有其它元素的祖先元素，所以也称为根元素 root element

    * 选择器与文档结构的对应
        * 后代选择器
            * p .foo  a  #top.foo.bar[class] img
            ```html
            <span></span>
            <p>
                <span></span>
                <span>
                    <span></span>
                    <span class="foo bar">
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                    </span>
                    <span>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                    </span>
                </span>
                <span></span>
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
            </p>
            <div>
                <p>
                </p>
            </div>
            ```
            * h1 em p#id.a.b[ATTR/attr="AbCd" i] span {}
            * td.main a:link
            * ul ol ul em {color: grey;}
            * ul em {color: grey;}
            <ul>
                <li><em></em></li>
                <li>
                    <ol>
                        <li>
                            <ul>
                                <li><em></em></li>
                            </ul>
                        </li>
                    </ol>
                </li>
            </ul>
        * 子元素选择器
            * div > h1 做为div的子元素的h1标签
                *
                ```html
                <div>
                    <h1>
                        <strong title="hello">adsfadsf</strong>
                    </h1>
                </div>
                ```
            * div > h1 > strong[title]
        * 邻接选择器
            * h1 + p.foo    h1后面的一个p标签
                ```html
                <p class="foo"></p>
                <h1></h1>
                <p class="foo"></p>
                <p class="foo"></p>
                ```
            * h1 ~ p.foo
            * h1 + .class#id[attr][attr=2][attr$=3] + p
            * <h1></h1>  sdfadsf   <p></p>
            * 只能向后选，不能向前选
            * [a] ~ p ~ p
              <h1 a></h1>
              <h1></h1>
              <h1></h1>
              <h1></h1>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
        * 组合多种选择器
            * p#foo .bar[attr=val]  a b c d
            *
            * [attr]p {

            }
            * p:hover {}
            * div ul.b > li ~ li
                ```html
                <div class="a">
                    <ul class="b">
                        <li class="a b c">1</li>
                        <li class="b">2</li>
                        <li class="c">3</li>
                    </ul>
                </div>
                <style>
                :first-child {

                }
                </style>
                ```
        * .a .b .c {}
        * .a.b.c {color: green;}
        * p,#b,.c {color: red;}
        * <p id=b class=c></p>



        * 伪类选择器
            * p51页
            * pseudo class
                * 链接伪类
                    * :link 未被访问过的有href属性的a标签
                    * :visited 访问过的链接
                    * 老前端，贺老live面试你了
                    * 坑：泄漏隐私的漏洞，所以不能用任何方法得到一个链接的颜色
                    * 同时也不能设置visited伪类的大部分属性
                * 动态伪类，交互伪类
                    * a:hover
                        - 子元素被hover的时候父元素也被hover了
                    * a:focus 光标在input元素里，有tabindex属性的元素点击一下以后
                    * a:active
                * 链接的伪类书写顺序
                    * link-visited-hover-active
                    * LV HA
                    * p54页
                * 位置伪类
                    * p
                    * :first-child 匹配做为第一个子结点的元素
                    * :last-child 匹配某元素的最后一个子元素
                    * :nth-child(1)
                    * :nth-last-child(1)
                    * :nth-child(3n+1)
                    * :nth-child(3n+2)
                    * :nth-child(3n+3)
                    * :nth-child(-2n+8)
                    * :nth-child(n-9)
                    * odd/even
                    * 注意：
                        * p:first-child 选择的不是p的第一个子结点，而是做为第一个子结点的p元素
                        * p :first-child
                * 选择器取反
                    * :not(:not([value])) {}
                    * :not(p.a#b) {}
            * pseudo element
                * :first-letter
                * :first-line
                    * 只能用在块级（block）元素上面，p59
                * ::before
                * ::after
                * 以后讲，第12章
                *
                * :root  :root   选择文档的根元素。   3:empty  p:empty 选择没有子元素的每个 <p> 元素（包括文本节点及空格）。
                    3 :target 选择的是一个【id为url中#后面的内容(hash)】的元素
                    #news:target    选择当前活动的 #news 元素。
                    3:enabled    input:enabled   选择每个启用的 <input> 元素。 3:disabled   input:disabled  选择每个禁用的 <input> 元素  3:checked    input:checked
                        input:valid/invalid
                        input:required/optional

                        :in-range {
                            background-color: yellow;
                            }
                            :out-of-range {
                            background-color: blue;
                            }
                 选择每个被选中的 <input> 元素。    3:not(selector)  :not(p) 选择非 <p> 元素的每个元素。    3::selection
            * css selector reference



    * 选择器的优先级
        * 优先级的定义，四个数
            * 0,3,3,10
            * (0，4，4，29)
            * (0, 6, 100000, 0)
            * 四位的无穷进制数
            * p63页
        * id选择器    #foo #bar #baz {}
            * 0，1，0，0
        * 类选择器，属性选择器，伪类选择器
            * 0，0，1，0
        * 元素选择器（标签选择器），伪元素选择器
            *
            * 0，0，0，1
        * 连接符如 > + ~ 等不参与优先级的计算
            * 于是 p a 与 p > a 的优先级是一样的
        * 通配符 * * * {}
            * 0，0，0，0
            * 所以以下选择器的优先级是一样的
                * div p      div的所有后代的p元素
                * div * p      div的孙子及其后代的p元素
        * 连接符 combinators，无优先级
        * 内联样式/行内样式/行间样式/inline style
            * 1，0，0，0
            * <p style="color: green;">
        * ！important
            * p {color: red !important;}
            * 有与important冲突的属性，important都会占上风
        * 继承
            * 没有优先级，比【*】的有限级还要小
            * p69页
        * 层叠样式
            * 用户自定义important样式
            * 网站作者important样式 authored style
            * 网站作者作者普通样式
            * 用户自定义普通样式 Custom.css
            * 默认样式，浏览器内置样式，User Agent Style
            * 优先级一样的话，按出现的顺序排列，后出现的优先级更高
                * 所以是 link visited focus hover active
                * :link:hover /0 0 2 0/
                * 不过在这几个伪类上分别写完全不同的属性时，顺序就不重要了
                * 重要的是写相同的属性，这时就要考虑优先级的问题了
                * LV HA  VL HA 没有太大区别，因为很明显，V和L不会同时匹配
            * 不来自CSS的样式
                * 如font标签 <font size color face></font>
                    * 可以想象它的优先级为0000并且出现在作者样式的开头
                    * 会被作者样式和读者样式覆盖，但不会被默认样式覆盖
                    * p75页
                * <font color="red">aa</font>
                * <style>* {color: green;}</style>