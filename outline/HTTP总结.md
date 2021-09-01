常见HTTP头部

请求头：
Host：告诉服务器浏览器是用什么域名和端口发的请求，其实就是地址中域名与端口的组合
User-Agent: 告诉服务器当前浏览器的信息，如版本号，系统，厂商与navigator.userAgent读出来的一样
Referer: 告诉服务器是哪个页面在请求这个资源。或者说当前资源请求后将被用在哪个页面。是地址栏当前地址。对于服务器来说，它可通过这个请求头知道是哪个页面在请求当前资源
  可以用来实现防盗链
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
  表示请求方希望接收的响应体类型
Accept-Encoding: gzip, deflate
  表示接收能够接收的压缩算法类型
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
  表示请求方希望接收的页面自然语言（给用户看的）
Connection: keep-alive/close
  表示请求方希望承载这个http请求的tcp连接在http流程结束后是保持还是关闭
  需要配合content-length头使用
  可以在一个请求/响应流程结束后继续使用这个tcp连接进行下一个请求/响应流程
    更进一步则是一次发多个请求，在连接上按顺序等待对应的响应结果
      称为http管线化(pipeline)
      Connection: keep-alive
      Keep-Alive: timeout=5
If-Modified-Since: Wed, 01 Sep 2021 03:49:05 GMT
  如果自此时间之后修改过，就返回新的内容给我。浏览器此时有该时的缓存版本
If-None-Match：dd4604dadec7c446abb9c6d80bc83338
  如果你那里的这个资源不匹配这个Etag，则返回新的

响应头：
Date: Wed, 01 Sep 2021 03:49:05 GMT
  表示服务器处理或响应该请求的时间
Content-Type: text/html; charset=UTF-8
  响应体的媒体类型
Content-Length: 38493
  响应体的长度（字节）
Connection: keep-alive
  同请求请求头
Content-Encoding: gzip
  响应体的压缩算法
Server: nginx
  表示服务器的软件，很多网站没有
Transfer-Encoding: chunked
  传输方式，一段段发，往往有这个头就没有Content-Length
Last-Modified: Thu, 01 Nov 2018 08:48:45 GMT
  该资源的最后修改时间
Expires: Wed, 01 Sep 2021 05:12:28 GMT
  该资源的过期时间，在过期之前，浏览器可以使用缓存的版本，过期之后就必须重新请求
    在过期之前用户如果按了F5或类似的刷新操作，浏览器也可能重新请求
Content-Disposition: attachment; filename="webzj_cdn101%2Fmessage.js"
  当响应中有这个头并且为attachment的时候，浏览器会触发下载对话框
ETag: dd4604dadec7c446abb9c6d80bc83338
  资源的hashcode
WWW-Authenticate: Basic realm="tip"
  服务器要求客户端提供账号，引号里是提示（浏览器不一定会展示）
  浏览器端要求用户输入账号以后，请求会带上以下头部
    Authorization: Basic YWFhOmJiYg==
    YWFhOmJiYg==是用户名密码用冒号拼接后的base64编码
    服务器验证后给出响应结果

content-security-policy: default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events translator.github.com wss://alive.github.com github.githubassets.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; frame-src render.githubusercontent.com viewscreen.githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ *.githubusercontent.com customer-stories-feed.github.com spotlights-feed.github.com; manifest-src 'self'; media-src github.githubassets.com; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; worker-src github.com/socket-worker-b05e50fc.js gist.github.com/socket-worker-b05e50fc.js
  内容安全策略，它是给html页面的响应头，限制这个页面的安全策略
    default-src 'none';
      没指的项的默认值
    base-uri 'self';

    block-all-mixed-content;
      阻止所有混合内容，即https页面不能加载http资源
    connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events translator.github.com wss://alive.github.com github.githubassets.com;
      页面里的js能够（通过xhr或websocket）与哪些服务器通信
    font-src github.githubassets.com;
      页面能够加载来自哪里的字体
    form-action 'self' github.com gist.github.com;
      页面能够将表单提交到哪里
    frame-ancestors 'none';
      这个页面能够将谁做为自己的frame祖先
      'none'即谁都不能做为这个页面的frame祖先
      即这个页面无法用frame的形式嵌套在任何页面
    frame-src render.githubusercontent.com viewscreen.githubusercontent.com;
      页面能够加载来自哪里的frame页面
    img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ *.githubusercontent.com customer-stories-feed.github.com spotlights-feed.github.com;
      页面能够加载来自哪里的图片
    manifest-src 'self';
      页面能够加载来自哪里的manifest
    media-src github.githubassets.com;
      页面能够加载来自哪里的多媒体资源
    script-src github.githubassets.com;
      页面能够加载来自哪里的js。这种写法会让内联js都无法运行(<div onclick="foo()">)
    style-src 'unsafe-inline' github.githubassets.com;
      页面能够加载来自哪里的css。
    worker-src github.com/socket-worker-b05e50fc.js gist.github.com/socket-worker-b05e50fc.js
      页面启动的worker能够来自哪里。


协商缓存（使用缓存需要先与服务器协商）：
Last-Modified/If-Modified-Since

  GET /resource HTTP/1.1
  ========================
  HTTP/1.1 200 OK
  Last-Modified: xxxxx
  ========================
  GET /resource HTTP/1.1
  If-Modified-Since: xxxxx
  ========================
  HTTP/1.1 304 Not Modified // 无响应体


ETag/If-None-Match:

  GET /resource HTTP/1.1
  ========================
  HTTP/1.1 200 OK
  ETag: hashcode of the resource
  ========================
  GET /resource HTTP/1.1
  If-None-Match: hashcode of the resource
  ========================
  HTTP/1.1 304 Not Modified // 无响应体

专门控制缓存的头：
Cache-Control 即可以出现在请求头里也可以出现在响应头里
Cache-Control: xxxx=yyy; maxage=xxxxywe


强缓存（使用资源时，直接使用，不发请求）:
Cache-Control
Expires

CORS（corss origin resource sharing跨域资源共享）:
  Access-Control-Allow-Access: *
  Access-Control-Allow-Methods: 预检请求允许的请求方法
  Access-Control-Allow-Headers: 预检请求允许的请求头
  Access-Control-Allow-Credientials: 预检请求声明是否允许的带上登录信息
  Access-Control-Max-Age: 预检请求所声明的内容的有效期，在有效期内发送符合声明的请求，不用再发预检请求了
  预检请求（preflight request）：
    在正式请求之前发起的一个用于【询问服务器当前客户端能否请求】的请求
    但并不是所有的请求都有预检请求，只有非简单请求有
    简单请求：

    非简单请求：

    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
