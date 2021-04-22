## Day03
* 面试题目
  * 分金条（二进制）

* 三篇文章
    * 花十年学编程
      * 《七周学七语言》
    * 来自老程序员的建议
    * 花两年面试一个人
    * http://www.duokan.com/book/66114
    * http://mindhacks.cn/2011/11/04/how-to-interview-a-person-for-two-years/
    * 提问的智慧

* markdown语言
  * 轻量
  * 是一种基本的**标记语言**（不是编程语言，不能表达逻辑，只能表达信息）
  * 内容是纯文本
  * 带格式的文本
  * 语法
    * 具体语法：文档：
      * N级标题
      * 段落
      * 链接 [linktext](url)
      * 图片 ![linktext](url)
      * 加粗，斜体等
      * 引用 >
      * 列表
        * 有序，无序
        * 层级
          * 最好使用 4 空格来缩进
      * 行内代码
      * 块级代码
        * 代码最好用代码块而不是缩进来表示，因为可以表达语言
      * 表格 vertical bar
        * | a | b | c |
        * |:---:|:---:|:---:|
        * | 1 | 2 | 3 |
      * 其它特殊格式，需要相应的软件支持
        * checklist
    * 软件
      + 浏览器插件
      + 在线编辑器
        * mahua markdown
        * stackedit
      + vscode
      + github支持
      + 有道云笔记
      * typora

* 命令行基础
    * GUI VS CLI
      * GUI - Graphics User Interface，图形化**用户**界面/接口
      * CLI - Command Line Interface，命令行界面
    * GUI程序与CLI程序唯一的区别就在于形式不一样
      * 背后都是程序在运行
    * API
      * Application Programming Interface 应用编程接口
        * jQuery
        * jQuery.get(url)
    * 不同系统命令行的区别
      * Linux
      * cgywin/mysys
      * mingw + git
      * wsl Windows Subsystem for Linux
      * 虚拟机
      * Android Termux
      * iSH   shell
    * 命令行最重要的两个概念
      * 当前工作目录(working folder/directory/tree)
        * current directory
      * 路径（列表）
    * 命令行基础
        * prompt 命令 提示符
        * 工作目录，Current Directory
          * pwd可以显示当前工作目录
        * 命令的格式
          * 命令名 参数1 参数2 参数3 参数4 ...
          * 参数是可选的
        * 一般命令，裸命令
            * pwd, clear, ls, cd
            * print working diretory

        * 带选项/参数的命令
            * ls --long-output
            * ls -l
            * ls --help
            * ls -h
            * <input>
            * <input type="password" required>

        * 选项的简写与完整写法
          * command -a
          * command --append
          * command -abc <==> comamnd -a -b -c
          * 例： tar -xvfc ./foo.tar
        * 选项带值的命令
            * chrome.exe --proxy-pac-url "xxx"
            * chrome.exe --proxy-pac-url=http://10.3.3.3:1080/pac
            * babel a.js -o=a.compiled.js
            * babel src/a.js --output dist/a.compiled.js
        * 将命令的输出写入文件
            * echo abc > foo.txt
        * 将命令的输出追加到文件
            * echo def >> foo.txt
        * pipe 前一个命令的输出(Output)做为后一个命令的输入(Input)
            * 管道符
            * IO  xxx.io  Google I/O 大会
            * input output
            * pm2 | grep "to" | lolcat    vertical bar
        * 按上下键可以切换最近输入过的命令
        * tab 自动补全
        * ctrl+C 强行停止当前正在运行的命令
        * ctrl+A 将光标移动到最前面
        * ctrl+E 将光标移动到最后面
        * ctrl+R 搜索命令历史
        * ctrl+L 清屏



* 常用命令
    * ls     list
      * ls -a -h -l
      * ls a.txt -lh
    * cat,   con cate nate
      * cat file1.txt file2.txt file3.txt > files.txt
        * 将文件们拼接放入files.txt里
    * split
      * split -b 5M aa.mkv aa-    将aa.mkv拆分成5M一个的文件，以aa-为前缀
    * echo 回显
    * cd   change directory
      * cd 相对路径（相对于当前工作目录）
      * cd 绝对路径
      * 补充：
        * 路径
        * 相对路径
        * 以 / 开头的路径是绝对路径
        * 其它情况表达的路径是相对路径，相对于当前工作目录
          * ..代表上一级目录
          * .代表当前目录
        * win/linux区别
    * which command 查询某命令对应的文件在哪里
    * vi
        * 基础使用
        * 达到可以在vps上编辑文本文件即可
            * esc 从编辑模式返回常规模式
            * i 常规模式下进入编辑模式
            * :wq 常规模式下输入
            * :q! 不保存退出
            * jkhl 在常规模式下相当于上下左右
            * vimtutor vim教程
        * 小白替代工具 mcedit 全鼠标操作
    * mkdir 创建文件夹（目录）thedir // make directory/folder/path
    * rmdir 删除文件夹 只能删除空的 remove directory
    * rm 删除文件
    * rm -r thedir 删除thedir及其内容
    * cp a.txt b.txt 复制
    * mv old new 移动（重命令）
    * touch a.txt 创建（空）文件，更新文件的最后访问时间
    * //chmod 文件权限控制
    * time command
        * 计算某命令的运行时间
    * date
        * 显示时间和日期
    * cal
        * 显示日历
    * //scp
    * //ping ip 测试与目标ip的连通性
    * .bashrc git bash启动时会运行该文件内的代码
      * alias foo=ll 创建别名
    * 修改bashrc文件以实现自定义命令
    