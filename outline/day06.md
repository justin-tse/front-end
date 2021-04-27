
## Day06 HTML
* em
* emphasis
* 语义为**强调**
* strong
* 语义也为强调
* 但强度跟em不同，strong的强调更重一些
* b bold
* 只是样式上加粗
* u underline
* i italic
* 多数网站会这个标签来表示图标



* u underline
* i
* italic，斜体的，一般编辑器（如word）的斜体按钮就是用的一个斜着的I图标表示
* 在以前，这个标签就是表示斜体文字的
* 但html5中对其语义进行了明确
    * 用来表示由于某些原因需要与普通文本区分的文本
* 默认情况下为斜体
* 因为跟icon这个单词的首字母一样，很多人/框架/库也用这个标签来表示图标
    - http://fontawesome.io/
        * `<i class="fa fa-star"></i>`
* `<!-- dfghjkl -->`
<!-- 注释 -->
- 没有基础的同学可能对注释这个概念有点陌生
    + **注释是对程序本身的解释，几乎不会对程序的行为造成任何影响**
        * 说几乎，是因为有些注释还是会对程序有一些影响
    + 几乎任意语言里都有注释
        * C/C++,JS,PHP，java等语言//   ,  /*  */ comment block  c style
        * bash 脚本（即命令行脚本），python
            - 以#做为注释
        * css
            - 以/**/内的内容为注释
            - xcolor: red;

* html entity
- 转义(escape)：html entity HTML实体
* &name;
* &#number; 十进制数，&#25105; 我
* &#xHHHH; 十六进制数,&#x6211;
    * Hexdecimal
* Unicode
* 常见具名html实体：
    * &nbsp; non-breaking space 160号空格
    * &amp; &符
    * &copy; 版权符
    * &lt; 小于号 lettle then
    * &gt; 大于号 greater then
    * &quot; 双引号 quote
    * &apos; 单引号
    * 文档：
    * Google： html entity
    * https://dev.w3.org/html5/html-author/charref
    * http://www.w3school.com.cn/html/html_entities.asp
    * http://www.w3school.com.cn/tags/html_ref_entities.html
    * [ square bracket ]
    * { curly braces } mustcache
    * ( parentheses )
    * ; semicolon
    * : colon
    * , comma
    * . period
    * / slash
    * \ backslash
    * ? question mark
    * + plus
    * * times star asterisk
    * | vertical  | bar  |
    * ! exclamation
* 对空白字符的忽略 我 我
* 默认情况下浏览器忽略文字与文字之间多于一个的空格，换行符会被全部忽略
* 当然css可以改变这种行为，后我们会看到




* 可访问性 accessibility   a11y  internationalizition  i18n
* 在各个设备上访问/对各种人群可访问/视障/听障
* 读屏软件
* windows 高比对度主题
* a r i a / role
* accessibly rich Internet Application
* 网页应用程序
* role属性提示浏览器当前元素是一个何种视觉元素
    * role=""
* aria-xxx="yyy"提示浏览器当前视觉元素的状态或其它信息

* pre
* pre formatted
* 表示有预定义格式的文本
    * 里面的内容的回车跟空格都会被保留
* 本来有个width属性，表示每行最多的字符
    - 本来支持度也不好，然后在html5中被弃用了，因为可以用css来更精确的控制
* 常与code标签 `配合` 使用，用来在`网页`里显示高亮过的代码
* <pre><code class="">code goes here</code></pre>
```js
var a = 8
```
<p>  foo  <code> bar </code>   </p>

* 列表类标签
- ol，ul
    + Ordered List, Unordered List
    + 其直接子结点必须只能是li标签 list item
        * li内可以是任意其它标签
    + 默认会在每多一层级的列表中缩进
    + 并带有列表项标号，有序和无序的
    * 多个同类项的重复，就应该使用ol/ul标签
    * LISP List Procressing SICP
    * 黑客与画家
- dl
    + Description List
    + dt
        * Description Term
    + dd
        * Description Description
    + 一个列表项是**一个dt**和**一个或多个dd**一起算一组
    + 此标签与ol/ul有些区别，在于
        * 一个dt可以对应多个dd
    ```html
    <ul>
        <li>
        <span>老师</span>
        <span>谢然</span>
        </li>
    </ul>
    <dl>
        <dt>老师</dt>
        <dd>谢然</dd>

        <dt>学生</dt>
        <dd>张三</dd>
        <dd>李四</dd>
        <dd>王五</dd>
    </dl>
    ```

* 表单标签
- form标签
    - input
        - https://www.google.com.hk/search?q=invalid+inentity+escape+in+regular+expression
        - https://stackoverflow.com/questions/36953775/firefox-error-unable-to-check-input-because-the-pattern-is-not-a-valid-regexp
        - https://www.fxsitecompat.com/en-CA/docs/2016/input-pattern-now-sets-u-flag-for-regular-expressions/
        - https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input
    * 属性
        + action
            * 表单提交的地址
        + target
            * 行为类似a标签的target
        + method
            * 表单提交方式
                - get
                    + 将表单字段拼成querystring
                        * 什么是querystring？
                            - http://abc.com/?a=1&b=2&c=3
                - post
                    * 这个等学到http再说
        + enctype，编码方式
            * 在讲到http的时候再谈
- input
    + type属性的各项值
        * text
            - 文本
        * password
            - 密码
        * checkbox
            - 复选框
            - 以name相同分组
            - checked属性表示默认选中
        * radio
            - 单选框
            - 剩余同上
        * file
            - accept
                + 可以接受的文件类型
                + `<input type="file" name="" id="" accept="image/*,text/*">`
                * MIME Type
                + `<input type="file" name="" id="" accept=".jpg,.png,.gif,.jpeg,.webp,.exe" value="c:/user/xieran/desktop/a.pdf">`
                * http://wwww.a.com/favicon.ico
            - 安全问题
            - multiple
                + 是否支持多选文件
            * .txt  text/plain
            * .js   application/javascript
            * .css  text/css
            * .html text/html
            * .png  image/png
            * .jpg  image/jpeg
            * .gif  image/gif
        * hidden
            - 隐藏的输入域
            - value设置其值
            - name设置名字
        * 为以下三个值时，都表现为按钮的样式，按钮上的文字需要用value属性来设置
        * image
            - 从功能上讲是一个表单提交按钮
            - 从形态上看是一个图片
            - 此时需要使用src属性指定图片的地址
            - 现在基本上不这么用，之所以有这个用法，是以前不用js时想做出漂亮的按钮时，需要这么用
            - 在html5中，可以在这种标签上给定width跟height，类似img标签相应的属性，src，alt
        * button
        * submit
            - 单击时会触发表单的提交
        * reset
            - 单击时会重置表单为初始状态
        * **以下为html5新增属性值**
        * number
            - 输入数字
            * e,.,-
            * -3.14e-8
            *
        * email
            - multiple
            - 使用半角逗号分隔每个地址
        * date
        * datetime-local
        * time
        * url
            * protocal://user:password@domain:port/a/b/c/d.html?a=b&c=d#sldjfoiwjeofij
            * 百度.中国
        * week
        * month
        * tel
        * range
            - min，4
            - max，10
            - step，2
        * color
            - value将返回十六进制颜色#abcdef
        * 不能识别的值，当做text来处理
    * input的其它属性
        - value
            + 为按钮形态时设置上面的文字
            + 为输入框时设置里面的默认内容
                * datetime-local
                * https://zh.wikipedia.org/wiki/ISO_8601
        - disabled
            + 无值的属性
            + 禁用这个输入域
        - required
            + 设置这个输入域为必填项
            + 不填的话无法用**正常手段**触发表单提交
        - maxlength
            + 为文本输入框时设置输入的最大长度
        - minlength
            + 同上，但为设置最小长度
            + 不过兼容性不太好，不少浏览器没有实现
                * 有点矛盾，不填的时候是空的，当然会非法
        - placeholder
            + 占位符
            + 提示性文字，一旦输入内容就消失
        - autofocus
            + 自动获得焦点，即页面加载完后光标自动在这个元素内
        - tabindex
            + 按tab键在不同输入域之间跳转时的顺序
            + 会往顺序更大的元素跳
            + 为-1的话会跳过那个元素
        - name
            + 很重要，表单提交时，这个域/字段/框/FormControl的名字
            + 同时，在radio和checkbox阵列里，name相同的元素被分在一组里
- button
    + type属性
        * 不写type属性的话，默认为submit
            - 即：无type的button的type属性默认为submit
        * `<button type="reset/button/submit">Submit</button>`
        * button
            - 常规按钮，功能上与input[type="button"]一样
        * submit
            - 提交按钮，功能上与input[type="submit"]一样
        * reset
            - 重置按钮，功能上与input[type="reset"]一样
    + 与`<input type="button" name="b" value="lksjdf">`的区别
        * input的button只能在按钮上显示纯文字
        * 而button标签可以在按钮上显示其它内容比如图片（即嵌套其它标签），文字也可以设置不同颜色等
- label 标签
    + 一般与checkbox及radio一起用，以扩大这两个按钮的可点击区域，提升用户体验。当然，也可以跟其它元素一起用，不过一般没必要（比较典型的是与input:file一起用）
    - for属性
        + 为想要被扩大点击区域的元素的id，不带井号
        - 支持度非常好，ie5都支持
        - 细节：在ie8及以下不能用于displaynone的表单元素，可能是因为 not focusable
        - 表单元素嵌套在label的时候可以不用for属性
            ```html
            <form action="">
            有for的用法
            <label for="oneid">One</label>

            <input onclick type="text" id="oneid">

            不用for的用法
            <label>
                <input type="checkbox"> 男
            </label>
            </form>
            ```
    - 如下怎么算呢？
        ```html
        <input id="a">
        <label for="a"> lllll
        <input type="text">
        </label>
        ```

    - 典型的坑，两次点击，等学了js后再谈
- select name="sel"
    + 下拉选择框
    + 属性
        * multiple
            - 无值属性，表示多选，多选时就不是下拉的样式了
    + 另外此标签在不同的系统里面样式差别很大，而且它的样式一般来说是取自系统自带的，所以很难被css控制
        * 所以一些对 ui 要求比较高的网站都选择用其它元素模拟下拉框
            - 例：小米路由器
    + size属性控制默认显示的数量，也即它的尺寸
* option
    * value
        - 选择了该项目后它所属的select元素的值
    * selected
        - 默认被选中
    * disabled
        - 表示该项被禁用
    * hidden
        - 表示该项被隐藏
    - 以上三个属性均无值
* optgroup // hgroup  colgroup
    - 给option分组
    - 用label属性表示这个分组的名字
    - 无法被选中，只选择option
    - 有一个disabled属性，如果设置了这个属性，整组标签都会被禁用
    ```html
    <select>
        <option value="1">1</option>
        <optgroup label="这是一个分组" disabled hidden>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
        </optgroup>
    </select>
    ```
    - 兼容性不确定，因为我没用过mac。。。。
- textarea
    + 多行文本输入框
    + 两个特殊属性
        * rows="3"
        * cols="20"
        + 不过现在也不常用，一般都用css来控制了
- fieldset 字段组 用来把 一组 输入域 放在一起的。
    + field就是字段的意思，就是说一个表单输入域（输入框）
    + 这个标签用来给输入域分组，所以叫set
        * set本来就是组的意思
    + 如果只是分组，完全可以用div等标签
        * 那这个标签有什么用呢？
        * fieldset有个disabled属性，如果它有了这个属性，其内的所有输入域都将被禁用，类似optgroup
            - 在某些场景下是非常好用的
- legend
    + 只能作为 field set 的子元素，用来标识这组输入域的名字，基本上没有其它用处
        * 而且在有了css之后，这个标签基本也没有用武之地了
