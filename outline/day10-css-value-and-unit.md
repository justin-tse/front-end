* 值与单位
    * 数字(次/个数，顺序，倍数)
        - line-height: 2.2;   /* 220% */
        - animation-iteration-count: 2;
        - zoom: 2.588888888;
        - zoom: .588888888;
        - column-count: 2;
        - z-index: 5;
    * 百分比
        - width/height: 60%;
        - top/left/right/bottom: 50%;
        - margin-top: 25%;
        - line-height: 150%;
        - vertical-align: 40%;
        - font-size: 200%;
        - color: rgb(40%, 50%, 70%)
    * 百分比与纯数字不可互换
    * 颜色(R G B)
        * color: red;
        * red/blue/green/tan/brown/teal/grey/maroon/silver/yellow/aqua/lime/
        * lightgreen/lightpink/lightblue/darkblue
            * 事实上大部分时候都用不到这些颜色，写demo的时候可以用来炫技
        * hex color
        #03558f   #0358f
        * #HHHHHH #(0-255)(0-255)(0-255) -> 16700000
        * #abc -> #aabbcc
        * #abcd - #a3bbccdd
        * hexa #ff00ff80
        * #456 -> #445566
        * #XYZ -> #XXYYZZ
        * #XYZA -> #XXYYZZAA
        * rgb(120,60,200)       sin(3.14) log(2,32) = 5
        * rgb(0-255, 10, 0-255)
        * rgb(0-255, 10, 0-255, 0.5)
        * rgb(r%,g%,0-100%, 0.6)
        * rgb(r%,g%,0-100%, 60%)
        * rgba(r,g,b,0 -> 1)
        * 色彩空间   色彩的数学模型
        * CMYK (Cyan magenta Yellow black)
        * 色域 屏幕能够显示的色彩范围
        * hsl（色相hue，饱和度saturate，明度light）
        * hsla（色相，饱和度，明度，0-1）
        * hexa rgba
        * web safe 颜色，216种
        - 是在早期大家的电脑都只支持256种颜色时，选出的大部分浏览器与操作系统都支持的216种颜色
            * 6的3次方，即r，g，b分别有6阶可选
        - https://websafecolors.info/learn
        - gif 图片也只有 256
        * p83
    * 长度
        * 绝对长度单位/物理长度单位
            * in(ch) 英寸
            * cm 厘米 centimeters
            * mm 毫米 millimeters
            * -moz-mm
            * pt point 72分之一inch
            * pc pica 6分之一inch
            * 存在的问题
                * 大部分时候不准，取绝于你的分辨率以及系统设置
                    - 于是用的也很少
                * 但在打印的时候可以比较准
            * Surface Studio
        * 相对长度单位
            * px，CSS像素
                * 很多人以为这是个绝对长度单位，其实并不是。但在设计中，大多数时候被认为是绝对长度（p89页）
                * 指定图片的大小一般肯定是用这个，要不然图片会被变形拉伸，因为图片的尺寸大多数时候是以px来丈量的
                * 另一个坑，在ie7之前的浏览器，放大时以px指定的文字不会放大，不过已经不在考虑范围了
            * em
                * 【当前元素】font-size的大小
                  ```css
                  <div class="foo">
                    <p></p>
                  </div>
                  div>div>div>div>div

                  .foo {
                      font-size: 30px;
                  }
                  p {
                    width: 10em;//
                    font-size: 1.5em;//45px
                    xfont-size: 150%;
                  }
                  ```
            * rem
                - root element's em
                - 灵活的布局
                - html 元素（根元素）的字号
                - html {font-size: 2em;}
                - p {width: 20rem;       }
            * ex
                * x字符的高度
                * 几乎没啥用处
                * 有些浏览器会把它计算成 0.5em
            * ch，0字符的宽度
                * l w
            * vw/vh
                - viewport width
                - 1vw 视口宽度的100之一
                - viewport height
                - 1vh 视口高度的100之一
                * 包含滚动条
            * vmax/vmin
                - vmax = max(1vw, 1vh)视口宽或者高较大的那一个的100之一
                - vmin = min(1vw, 1vh)视口宽或者高较小的那一个的100之一
            * width: calc(2 * 30em - 40%)
            * width: calc(10px * 10 - 5%)
            * width: calc(10px * 10px / 10px)
            * width: calc(500px - 2em)
            * line-height: calc(2 * 3)
            * 1km - 10mm
    * 角度
        - degree 角度 45° 90deg
        sin(pi/4)
        - radian 弧度：3.14rad = 180deg     90deg => pi/2
        - turn -》   1turn = 360deg = 6.28rad
        * 30deg
        * transform: rotate(180deg);
        * transform: rotate(3.141592653589793238462643383279rad);
    * 时间
        * 1s
        * 1.2s
        * 0.2s
        * .2s
        * .3s
        * 1ms
        * 1s = 1000ms
    * hz
        * 5hz
    * URL
        * import "aaa.css";
        * background-image: url(a.png);
        * url(path)
        * url(protocol://server/pathname)
        * url("protocol://a:b@server/pathname?a=b&c=d")
        * url(/../../abc.jpg)
        * 相对路径相对于【这句代码】所在的文件所在的文件夹
        * 相对路径，绝对路径等，一个话题
    * css关键字
        * width: 300px;
        * display: none block inline inline-block table table-cell ;
        * background-color: currentColor;
        * font-size: inherit;
        * border-style: solid/dotted/dashed/ridge;
        * none，注意跟0不一样
        * inherit
        * 如果一个属性接受关键字，这些关键字则专门指定为该属性的关键字
        * 如果两个属性接受同一个关键字，这两个关键字的行为很多时候是不一样的
            * 比如说，normal，在给letter-spacing与font-style时意义完全不同
                * letter-spacing: normal
                * font-style: normal
    * 字符串
        * content: 'ffoo\6211oo'  "woiejfowiejf"   "jowiejfo";
    * 取属性的值
        * content: attr(href);
        * transform: rotate(30deg) skew(50deg) matrix(1,2,3,4,5,6);
