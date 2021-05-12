## Day11 CSS Font and Text Properties
### Source come from CSS: The Definitive Guide, 3rd Edition and Da Miao
### 第5章Font
* 字体
    * 字体族
        * serif 衬线字体
        * sans-serif 非衬线字体
            * 什么是衬线？
        * monospace 字体，等宽字体
    * 使用通用字体族
        * body {font-family: sans-serif;}
        * 以上代码中，浏览器将自动选择一款没有衬线的字体
    * 使用指定的字体
        * h1 {
        font-family: "MicroSoft YaHei";
        }
            * 如果用户的电脑上安装了这款字体，那么该页面上的h1将会用这个字体
            * The quick brown fox jumps over the lazy dog.
            * 全字母句
        * 但是，有时候用户的浏览器并不一定安装了这个字体
            * 这时可以指定退化（fallback）方案
        * h1 {font-family: "Helvetica", "微软雅黑", sans-serif;}
        * 一般来说，最好提供一个字体族名称做为最后的退化方案
        * <p> 一般，function </p>
    * 字体名称里面有特殊字符时
        * 使用引号（quotation marks）引起来
            * 单双均可，只要配对就好
                * 但注意在html标签的style标签里面的时候要跟外层的引号匹配，还是配对问题
        * 如果不加的话，浏览器会忽略那个字体声明
            * p {font-family: "Microsoft YaHei", "lksdjf, i*7#" , serif;}
            * 上面这条规则相当于p {font-family: "Microsoft YaHei", serif;}
            * 书上是这么说，但是我试了Chrome会忽略整条规则
        * 另外，通用字体族必须不能加引号，它们算是关键字而不是字体值（字符串）
            * 加了引号就成指定的字体名称而不是字体族了
        * font-family: 'microsoft yahei';
    * 字重
        * font-weight
            * normal
            * bold
            * bolder  <h1> bar <span>foo</span></h1>
            * lighter
            * 100 - 900
            * inherit
        * 一般来说，一些字体都会预定义一些不同字重的字体
            * 如
                font-family: 'Zurich';
                font-weight: bold;
                * Zurich Extra Black
                * Zurich Black
                * Zurich Bold
                * Zurich
                * Zurich Light
                * 例：苹方字体全套
            * 于是可以这么用
                * p {font-family: 'Zurich Black'}
                * div {font-family: 'Zurich Light'}
                * strong {font-family: 'Zurich Bold'}
            * 但
                1. 上面的写法很繁琐
                2. 很多字体**不一定**预定义了这么多种不同的内置字重，或者用户不一定安装了所有这些字体
                    * 这意味着可能会使用退化字体
                3. 很多可能就只有一种
                    * 这种情况下浏览器可能会实时计算出比如粗体的样子
            * 怎么办呢？
                * 只指定主字体，然后指定font-weight，由浏览器来选择具体字重的字体文件，或者计算出来
            * Bolder
                * 让字体变的更粗
            * Lighter
                * 让字体变的更细
    * 字号 font-size，
        * （所谓的）绝对大小关键字
            * xx-small
            * x-small
            * small
            * font-size: medium;
            * large
            * x-large
            * xx-large
        * 根据规范，一个绝对大小与相邻的绝对大小的缩放因子是1.5以及0.66
            * 比如如果medium是10px
            * 那large就是15px
            * small就是6.66px
            * 但
                * 不同浏览器设置的缩放因子可能并不一样
                    * 而且，这个值是开发者没办法更改的
                * medium的大小也是不确定的
                * 所以这几个关键字基本上没什么用武之地
        * 百分比单位
            - 相对于父元素的大小，也即继承过来的值
            - 跟em的效果几乎是一样的
                + 120%跟1.2em几乎一样
            - 使用这种单位可能会产生意想不到的效果
              ```html
              <style>
                  span {
                    font-size: 150%;
                  }
                  em {
                    font-size: 1.5em;
                  }
              </style>
              <span>
              a(24) <em>abc(19.2)</em>
                <span>b(36)
                    <span>c(54)
                        <span>d()
                            <span>a span</span>
                        </span>
                    </span>
                </span>
              </span>
              ```
            - 字会越来越小。。。
        * font-size的继承
            - 总是继承的是**计算后**的值，而不是**书写时**的值
            * div>p>span
            * div {font-size: 10px;}
            * p {font-size: 120%;}
            * span {font-size: 120%;} -> 14.4px
        * 长度单位
            - 绝对单位如cm，pt等可能不是你想要的
                + 不同的系统可能显示效果不一致
            - 所以大多数页面中选择px等单位
                + 能够“最大程度的”保证设计的高度还原
                + 但存在的一些问题是，老版本的浏览器在放大页面或字体的时候，无法放大以px指定大小的字体
                + 现代浏览器无此问题
    + font-style与font-variants
        * font-family: "Consolas";
        * font-style
            - normal
                + 文字**是正*的，即垂直的
            - italic
            - oblique
            - 上面两个都是斜体，但是有啥区别呢？
                + italic是另一个专门设计好的斜体字体
                    * 比如正常字体是 Roboto
                    * 则italic字体可能会是 Roboto Italic，Roboto Cursive
                + 而oblique则是在正体的文字基础上变幻出来的一个斜体字
                    * 而oblique则一般会map到Roboto Slanted，Roboto Incline， Roboto Oblique
            * 此处细节较多，建议看书本p115页
        * font-variant
            - normal，默认
            - small-caps
                + 把小写字母显示成小号的大写字母
                + 有些字体专门为小写字母设计了这种样式，而不是单纯的把大写字母显示的小一点。
                    * 当字体没有提供这种样式的时候，浏览器当然就是把大写字母缩小了
            - 与 text-transform：uppercase
                + 这个规则是把所有的文字显示成大写
                * the quick-brown fox
                * captialize -> The Quick-Brown Fox
                子属性



        - font-size/family/style/weight/variant
        - font: ;
        - font-style:;
        - font-weight:;
        - border SHORT HAND
        - border-style/width/color;
        - border-left/right/top/botoom
        - border-left/right/top/bottom-style/widht/color;
        - margin   margin-left/right/top/bottom;
        - transition transition-duration/timing-funciton/property....
        - border-radius
        * font 属性 short hand
            - font: bold normal  30px 宋体, 'yahei', serif;

            font: [<font-style> || <font-variant> || <font-weight>] <font-size>[ / <line-height>] <font-family>;

            font-style: bold | italic | oblique;
            - font: small-caps bold 20px / 1.2em 宋体, serif;
            - 前三个的顺序不重要
                + border:red  solid 1px;
            - 如果前三个的随便哪一个值为normal，则可以省略
            - line-height可以省略，但如果出现，必须加/并且出现在fz的后面
            - fz跟ff必须出现，而且顺序也是这个顺序，不能乱
            - font: 25px/1.2 "宋体" ;
            - font: 25px "宋体";
            - font: 120%/1.2 "宋体";
            - font: small-caps 120% / 1.2 "宋体";
            - p121页

### 第6章Text Properties
* 文字相关的属性
    - 文字缩进 text-indent
        + 以前是怎么做的呢，放张白色的图片在段落前面。。。
            * 也有说有一个非标准的spacer标签，p128页
        + text-indent: 2em
        + text-indent: 5%；百分比相对于元素自身的宽度
            * 一般很少用百分比
        + 应用
            * 用text-indent: -99999px来把标签里的文字隐藏，然后用背景图片“替换”标签内容
            * -2em这种可以实现首行悬挂
            * 2em则可以实现首行缩进
        + 本属性只适用于块级元素，不适用于内联元素
    - 文字水平对齐 text-align，text-align-last
        + left
        + right
        + center
        + justify
            * 两端对齐
            * 不同行文字之间的空白可能就不一样了
            * 在有长单词的行中显得比较明显
                - css 并不支持在打断长单词时自动加上连字符-
                    + 据说原因是因为不同的语言的连字符不一样
                        * p133页
            * 脑洞：单行文字两端对齐
        + 与center元素作用不一样，center会把整个元素都居中，而text-align只居中文字
            * http://jsbin.com/senefeg/1/edit?html,css,output
    - 文字在垂直方向的对齐 vertical-align
        + line-height
            * content-area
            * inline-box
            * p135页，图
            * 取值
                - 长度
                - 百分比
                - 以及inherit
                    + 取非纯数值时，继承的是计算结果
                        * 即取inherit时，也是得到的计算后的结果
                - 纯数值
                    + 取纯数值时，继承的是书写数值
                    + p137页
            * 应用：单行文字垂直居中
                - 坑点，无法让lh总是等于元素的高度
                - 其它
                    + 多行文字垂直居中
                        * http://www.zhangxinxu.com/wordpress/2009/08/%E5%A4%A7%E5%B0%8F%E4%B8%8D%E5%9B%BA%E5%AE%9A%E7%9A%84%E5%9B%BE%E7%89%87%E3%80%81%E5%A4%9A%E8%A1%8C%E6%96%87%E5%AD%97%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/
                    + flex等实现方式
        + vertical-align
            * 这个属性适用于【内联元素】
                - img
                - input
                - 替换元素等
                - 而不是给块级元素用的
            * 取值
                - 关键字
                    + baseline
                        * 默认值
                        * 让元素的基线与其父元素行框的基线对齐
                        * 如果一个元素没有基线，如img，input，则让其底部与外面的文字对齐。即使行框没有文字也是一样。是p138-139页
                            - 应用：图片跟文字底部对不齐
                    + sub
                        * 元素的baseline（或底部）会比父该行文字的basline低
                        * 但低多少，标准并没有说。。。
                    + super
                        * 同上，元素的baseline比该行内容的baseline要高
                        * 标准同样没有规定高多少。。
                    + bottom
                        * 目标元素的底部跟这一行的底部对齐
                    + top
                        * 目标元素的顶部跟这一行的顶部对齐
                    + text-top
                    + text-bottom
                        * 元素的顶/底部与文字的顶/底部对齐
                    + middle
                        * 并不是垂直居中
                        * 而是把【元素的中间】与baseline上面0.5ex（即四分之一em）对齐。。。
                    + 百分比
                        * 相对于自己的 line-height
                        * 把其 baseline 向上或向下移动计算出来的值
                    + 固定长度值
                        * 按指定的数值上移或下移元素
                        * 上下移动元素并不会让其与其它行的内容重叠，而是会增加行框的高度
                - 在作用于表格元素时
                    + 只有 baseline，top，middle，bottom 有效，其它无效
                        * 将在表格布局一章说到
        + word-spacing
            * 控制单词间的间隔
                - 注意中文文字之间不是word space，而是letter space
                    + p144页
            * 其值是添加到本身空格间的值，而不是设置了多少，单词间就间隔多少
            * 取值
                - normal
                    + 相当于写成0
                - 长度单位
                    + 写成多少，单词间的间隔就是空格的宽度加这个值
                    + 可以为负值
        + letter-spacing
            * 改变字母间的间隔
                - 对于汉语，则是改变文字之间的间隔
            * 取值
                - normal
                    + 相当于设置为0
                - 长度值
                    + 增加或减少字母间的距离
        + word-spacing，letter-spacing 与 text-align：justify
            * letter-spacing:normal与text-align:justify一起用时，字母间的距离可能会被改变
            * 但如果给了letter-spacing一个指定的值的话，则justify就不会影响它了
            * http://jsbin.com/pasekej/1/edit?html,css,output

        + text-transform
            * uppercase
                - 所有字母变成大写
            * lowercase
                - 所有字母变成小写
            * capitalize
                - 每个单词的首字母大写
                    + 值得注意的是
                    + heading-one可能被转换成下面两种
                        * Heading-One
                        * Heading-one
            * 本属性的效果先于font-variant执行
            * none
                - 默认，as authored
            * inherit
            * 应用
                * 有些网站的优惠券是全大写的，或者Windows的激活码什么的
                * 输入的时候有些用户可能会觉得是要输入大写还是小写
                * 这时就可以使用text-transform来实现不按shift就输入大写
                * 来源：在本来生活网上买东西时用优惠券时想到的

        * div#foo{
            font-size: 40px;
            font: 24px/1.2 sanif;
        }
        + text-decoration:  overline underline;
            * underline
                - 下划线
            * overline
                - 上划线
            * line-through
                - 删除线
            * blink
                - 不支持了
            * 值得注意的是子元素没有办法去掉由父元素留下的各种线
            * 另外线的位置，粗细，样式都不能指定
                - 有其它解决方案，用背景图片
                - http://jsbin.com/yacobev/1/edit?html,css,output
            * https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration
            *   text-decoration:   ;;
            *   text-decoration-line: line-through;
                text-decoration-thickness: initial;
                text-decoration-style: dashed/dotted/solid/wavy;
                text-decoration-color: red;
        + text-shadow
            * 文字阴影
            * 取值：
                *   水平偏移 垂直偏移 模糊半径 颜色, 下一组;
                * 颜色可以出现在最前或者最后，也可以省略，默认为黑
                * 模糊半径可以不写，则为0
                * 可以用逗号写多组阴影
                https://flow.org
        + box-shadow
            * 与上类似
            * 取值
                - 水平偏移 垂直偏移 模糊半径 扩散半径 颜色,下一组;
                - 两个半径都可以不写，默认都为0
                - 颜色同上

        + white-space
            * 指定如何处理空格与换行，以及自动换行
            * p155表格
            * https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space
        + word-break
            * 指定单词如何折行
            * https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break
        + overflow-wrap
            * 以前叫 word-wrap，是早期ie浏览器引入的一个属性
                - 题外话：ie在文字排印方面的css支持很好，可惜很多浏览器一直不跟进
            * https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-wrap
            * http://www.cnblogs.com/2050/archive/2012/08/10/2632256.html
        + direction
            * ltr
                - left to right
            * rtl
                - right to left
        + unicode-bidi: bi directional;
