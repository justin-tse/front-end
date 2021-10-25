# Linux & 服务器部署

* VPS的购买
  * 不同服务商
  * 使用最新版系统
  * 将域名指向VPS的IP，之后就不用记忆ip了
* VPS的登陆
  * SSH协议与命令
    * 密码登陆
      * 首次登陆后的密码修改
    * 公私钥登陆
      * 钥匙对的生成
      * github等服务也支持使用公私钥做为登陆机制
    * 端口的设置
      * /etc/ssh/sshd_config
  * 不指定端口号登陆
    * .ssh/config及相关文件的作用
  * 一键登陆的设置
    * bash alias

* Linux服务器软件的安装
  * apt on Ubuntu
  * pkg/apt on Termux
* Node.js的安装
  * 直接用包管理工具安装
    * 官网教程
  * 多版本控制
    * n与nvm
      * npm i -g n
      * https://github.com/nvm-sh/nvm

aria2

* Zsh
  * 与bash的区别
    * 其它shell如fish，sh等
  * 安装与配置
    * 配置很麻烦，所以有了oh my zsh
  * 主题的选择
    * 推荐ys
  * zsh的好处：
    * 更多的主题
    * 更多的命令别名
    * 更方便的自动联想
    * 更方便的目录切换
    * 更方面的git状态显示

* 文本编辑器
  * vi&vim
    * oh my vim
  * mc&mcedit

* 任务管理器
  * top & htop

* 文件传输
  * 用git传代码
  * scp
    * scp -r
    * scp -P 28289 -r  root@u.cddm.me:~/foo/ .
    * cp -r /foo/ba /bza/baa
    * ssh -p 28289
  * filezilla
    * sftp: 基于ssh协议的文件传输
  * winscp
  * rsync 增量更新
  * 将vps做为git服务器
    * 服务器：git init --bare

* Linux下如何并行任务
  * 以 & 结尾一条命令
  * CTRL-Z 暂停当前任务并返回命令行
  * jobs 列出后台任务
  * bg 把最近暂停的任务转入后台运行
  * fg 把最近操作的后台的任务转入前台运行
    * fg %n 操作jobs列出来的第n个任务
  * kill %n 杀掉jobs列出的第n个任务

* 登陆到ssh会话中启动的命令会在会话断开或结束后被kill
  * node演示
* tmux 介绍及基本使用
  * tmux a
  * ctrl-b + 命令键
  * 分面板
    * % 左右分
    * " 上下分
  * 分窗口
  * d 从tmux脱离，后台依然执行
  * 设置使用鼠标
    * ~/.tmux.conf
    * set -g mouse on
  * tmux退出后还能运行的大致原理
    * Client/Server模式（观察进程树）
  * tmux的同屏功能
    * 结对编程
* tmux 太麻烦？
  * byobu

* pm2 介绍 process manager
  * nodejs 的进程管理工具
    * 其实不只可以管理node的程序，任何linux上的进程都可以
  * pm2 start xx.js -- args for xx.js
  * 重启后就没有了
  * pm2 save  保存当前被pm2启动的进程列表
  * pm2 resurrect 启动之前save过的进程列表
  * pm2 startup 设置pm2开机自启动，启动后它会自动resurrect
  * pm2 unstartup 设置pm2取消开机自启动
  * pm2 help
  * pm2 logs id
  * pm2 show id
  * pm2 l(ist)
  * pm2 monit
  * 设置自动启动
  * /etc/rc.local


* 手机怎么登陆？
  * JuiceSSH   ip  port   password    生成一对公私钥，
  * Termux      ssh root@xxx.com -p yyyy
      //  passwd  设置密码后可以用密码远程登陆termux（注意打开sshd）
  * iOS Terminus
* 手机使用SSH老断线？因为移动网络总是会切换ip，那么tcp连接就断了
  * mosh     mosh root@9.cddm.me
    * 基于UDP的ssh子协议
      * 不支持ssh的一些功能，但回显速度一流，且永不断线

* 网站想要 https ？
  * 有证书就可以了
  * Let's Encrypt 基于 acme 协议提供免费证书
    * 只要能证明域名归属，即免费发放有效期三个月的证书
  * ACME客户端
    * 各种语言版本的
    * bash版本的
      * acme.sh
    * 在线版的（不建议使用）
    * acme --issue -d xxx.me -d a.xxx.me --standalone
      * 一张证书中只能有同一个主域名下的域名
      * acme会自动更新证书，之后不用再管了

* https模块，createServer时加两个选项就可以了
* http与https同时部署
  * 两个server用同一个responder即可
  * http自动跳转到同url的https页面中去
    * 如何写？

const https = require('https')
const http = require('http')
const fs = require('fs')
const app = require('./app.js')

const httpServer = http.createServer()
const httpsServer = https.createServer({
  key: fs.readFileSync('/root/.acme.sh/9.cddm.me/9.cddm.me.key'),
  cert: fs.readFileSync('/root/.acme.sh/9.cddm.me/9.cddm.me.cer'),
})


httpServer.on('request', app)

<!-- 自动跳到https站点 -->
httpServer.on('request', (req, res) => {
  res.writeHead(302, {
    Location: `https://9.cddm.me${req.url}`
  })
})
httpsServer.on('request', app)

httpsServer.listen(443, () => {
  console.log('https ok')
})
