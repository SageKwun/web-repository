# Network

# Reference

[TCP/IP 指南 (halfrost.com)](https://halfrost.com/tcp_ip/)

[图解 | 你管这破玩意儿叫网络？ (qq.com)](https://mp.weixin.qq.com/s/euNVf4x1W0H8EeVa7dbcLw)

---

# OSI

| 应用层     | 针对特定应用的协议                       | DNS HTTP DNS POP3 SMTP SSH |
| ---------- | ---------------------------------------- | -------------------------- |
| 表示层     | 设备固有数据格式和网络标准数据格式的转换 | SSL                        |
| 会话层     | 通信管理，管理传输层以下的分层           | SSL TSL                    |
| 传输层     | 管理两个节点之间的数据传输               | TCP UDP                    |
| 网络层     | 地址管理和路由选择                       | IP ICMP OSPF               |
| 数据链路层 | 互连设备之间传送和识别数据帧             | WLAN Wi-Fi                 |
| 物理层     |                                          |                            |

![Untitled](Network%20b634a/Untitled.png)

![Untitled](Network%20b634a/Untitled%201.png)

![Untitled](Network%20b634a/Untitled%202.png)

DNS 是应用层协议，SSL 分别位于第五层会话层和第六层表示层。TLS 位于第五层会话层

![Untitled](Network%20b634a/Untitled%203.png)

最后，应用层协议中数据的单位叫，消息。

TCP、UDP 数据流中的信息叫，段。

IP、TCP、UDP 网络层的包的单位叫，数据报。

物理层传输的是字节流，数据链路层中包的单位叫，帧。

# HTTP

[HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)

![Untitled](Network%20b634a/Untitled%204.png)

## HTTP /0.9

- _request line_ only & no _response head_
- charset is ASCII
- disconnect after document transfer

## HTTP /1.0

- add _request head_ & _body_
- add `accept` `accept-encoding` `accept-Charset` `accept-language` in request head
- add `content-encoding` `content-type` in response
- add _state code_
- add _Cache_
- add `user proxy`

```powershell
accept: text/html
accept-encoding: gzip, br
accept-Charset: utf-8
accept-language: zh-CN, zh
```

```powershell
content-encoding: br
content-type: text/html;charset=UTF-8
```

## HTTP /1.1

1. chunk transfer 机制，将数据分成数据块

   不定长包体：`Transfer-Encoding: chunk`

2. Cookie
3. 增加 host 请求头
4. 持久连接（管道化浏览器**默认不开启**）CDN，域名分片
5. **错误通知的管理**：新增了 **24 个错误状态响应码**
6. **缓存处理**： 在 HTTP1.0 中主要使用 header 里的 If-Modified-Since, Expires 来做为缓存判断的标准，HTTP1.1 则引入了更多的缓存控制策略例如 Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等更多可供选择的缓存头来控制缓存策略。**304 Not Modified**
7. **带宽优化及网络连接的使用**
   HTTP/1.1 允许只请求资源的某个部分，返回码是 **206 Partial Content**

安全

![Untitled](Network%20b634a/Untitled%205.png)

## HTTP /2

1. 利用**二进制分帧层**实现**多路复用**
2. **服务器推送**，提前把可能用到的资源推送给客户端
3. **头部压缩**，在客户端和服务器共同维护一张头信息表，所有字段都生成各自的索引号，以后只发索引号，提高速度
4. **优先级**，客户端请求的时候标上优先级

![Untitled](Network%20b634a/Untitled%206.png)

![Network%20b634a/Untitled%207.png](Network%20b634a/Untitled%207.png)

## HTTP /3 QUIC

[HTTP/3 原理与实践 (qq.com)](https://mp.weixin.qq.com/s/iF0wbV5o7HVjGG_Cb-RcOg)

![Network%20b634a/Untitled%208.png](Network%20b634a/Untitled%208.png)

![Network%20b634a/Untitled%209.png](Network%20b634a/Untitled%209.png)

# HTTP 状态码

[HTTP 响应代码 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

[RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1 (ietf.org)](https://datatracker.ietf.org/doc/html/rfc2616#section-10)

- 1xx 信息响应，表示目前是协议处理的中间状态，还需要后续操作
  - **100** Continue 这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它
  - **101** Switching Protocol 该代码是响应客户端的  [Upgrade (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)  标头发送的，并且指示服务器也正在切换的协议（比如切到**WebSocket**）
- 2xx 成功响应
  - **200 OK** 请求成功
  - **201 Created** 该请求已成功，并因此创建了一个新的资源。这通常是在**POST**或是某些 PUT 请求之后返回的响应
  - **202 Accept** 表示服务器端**已经收到请求消息**，但是**尚未进行处理**。但是对于请求的处理确实无保证的，即稍后无法通过 HTTP 协议给客户端发送一个异步请求来告知其请求的处理结果。这个状态码被设计用来将请求交由另外一个进程或者服务器来进行处理，或者是对请求进行批处理的情形
  - **204 No Content** 服务器成功处理请求，但不需要返回任何实体内容，浏览器无需刷新视图。用于例如**OPTIONS 请求**，文档自动保存等
  - **205 Reset Content** 服务器成功处理请求，但没有返回任何内容，浏览器重置文档视图
  - **206 Partial Content** 服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求**必须包含 Range 头**信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件
- 3xx 重定向，资源位置发生变动，需要重新请求
  - **300 Multiple Choice**
  - **301 Moved Permanently** 永久重定向，会被缓存，以后向新的发送
  - **302 Found 临时重定向**，不会被缓存，以后继续向此发送。出于历史原因，用户代理可能会将后续请求的请求方法从 POST 更改为 GET。如果不希望出现这种行为，可以使用 307（临时重定向）状态代码
  - **303 See Othe**r 客户端应该以**GET**重定向
  - **304 Not Modified** 请求的资源未改变
  - **307 Temporary Redirect** 临时重定向，不会被缓存，以后继续向此发送，**不改方法，HSTS**
- 4xx 客户端错误，请求报文有误
  - **400 Bad Request** 语义或请求参数有误
  - **401 Unauthorized** 需要用户验证
  - **403 Forbidden** 服务器理解请求并拒绝执行
  - **404 Not Found** 希望得到的资源未发现
  - **405 Method Not Allowed** 请求的方法不被允许
  - **429 Too Many Requests** 请求过于频繁，例如 leetcode 的执行
- 5xx 服务器错误
  - **500 Internal Server Error** 服务器内部错误
  - **502 Bad Gateway** 网关错误（后端挂了）
  - **503 Service Unavailable** 服务器没有准备好处理请求。常见原因是服务器因维护或重载而停机
  - **504 Gateway Timeout** 当服务器作为网关，不能及时得到响应时返回此错误代码。（后端太久了）

# HTTP 头部

## Accept-Content 系列

![https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/22/170ffd6bb6d09c2d~tplv-t2oaga2asx-watermark.awebp](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/22/170ffd6bb6d09c2d~tplv-t2oaga2asx-watermark.awebp)

数据格式 Accept — Content-Type

压缩方式 Accept/Content-Encoding

支持语言 Accept/Content-Language

字符集 Accept-Charset — Content-Type

### 定长包体和不定长包体

定长包体：Content-Length 少了会截内容，长了会报错

### 大文件

1. 服务器响应 `Accept-Ranges: none`
2. 客户端申请
   1. 单段数据 `Range: bytes=0-9`
   2. 多段数据 `Range: bytes=0-9, 30-39`
3. 服务器响应
   1. 单段数据 `Content-Range: bytes 0-9/100`
   2. 多段数据

### 表单提交

1. `Content-Type: application/x-www-form-urlencoded`

   其中的数据会被编码成以`**&**`分隔的键值对，再以**URL 编码方式**编码

2. `Content-Type: multipart/form-data`

   每个资源都是**独立表述**，适合图片等文件上传

# Cookie

Reference

[HTTP cookies - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

[Set-Cookie - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)

[预测最近面试会考 Cookie 的 SameSite 属性 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904095711494151)

[当浏览器全面禁用三方 Cookie - 掘金 (juejin.cn)](https://juejin.cn/post/6844904128557105166)

[第三方 Cookie 用在哪里？ - 掘金 (juejin.cn)](https://juejin.cn/post/6973996294540886046)

---

- **名称=值**：**URL 编码。**唯一标识 cookie 的名称。cookie 名不区分大小写，因此 `myCookie` 和`MyCookie` 是同一个名称。不过，实践中最好将 cookie 名当成区分大小写来对待，因为一些服务器软件可能这样对待它们。
- **域**：`Domain=where.com` cookie 有效的域。发送到这个域的所有请求都会包含对应的 cookie。这个值可能包含子域（如 [www.wrox.com](http://www.wrox.com) ），也可以不包含（如 .wrox.com 表示对 wrox.com 的所有子域都有效）。如果不明确设置，则默认为设置 cookie 的域。
- **路径**：`Path=/` 请求 URL 中包含这个路径才会把 cookie 发送到服务器。例如，可以指定 cookie 只能由http://www.wrox.com/books/访问，因此访问http://www.wrox.com/下的页面就不会发送cookie，即使请求的是同一个域。
- **过期时间**：`Expires=GMT格式（Wdy, DD-Mon-YYYY HH:MM:SS GMT）`表示何时删除 cookie 的时间戳（即什么时间之后就不发送到服务器了）。默认情况下，浏览器会话结束后会删除所有 cookie。不过，也可以设置删除 cookie 的时间。这个值用于指定删除 cookie 的具体时间。这样即使关闭浏览器 cookie 也会保留在用户机器上。把过期时间设置为过去的时间会立即删除 cookie。
- **安全标志**：
  - `Secure`设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器。例如，请求https://www.wrox.com会发送cookie，而请求http://www.wrox.com则不会。
  - `HttpOnly`客户端不能读取，只能用于 http 请求发送
  - `SameSite`
    - None
    - Strict 浏览器将只在访问相同站点时发送 cookie
    - Lax（默认）允许部分第三方请求携带 Cookie
      ![Untitled](Network%20b634a/Untitled%2010.png)

```
Set-Cookie: name=value; Expires=Mon, 22-Jan-07 07:10:24 GMT; Domain=.wrox.com; Path=/; Secure; HttpOnly
```

### 第三方 cookie

### 删除 cookie

过期时间为 0，value 为 “”

# URI

# CORS 跨源资源共享

## Reference

[跨源资源共享（CORS） - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

## 简单请求

某些请求不会触发  [CORS 预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)。本文称这样的请求为“简单请求”，请注意，该术语并不属于  [Fetch](https://fetch.spec.whatwg.org/) （其中定义了 CORS）规范。若请求  **满足所有下述条件**，则该请求可视为“简单请求”：

1. 使用下列方法之一：
   - `[GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)`
   - `[POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)`
   - `[HEAD](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD)`
2. 除了被用户代理自动设置的首部字段（例如  `[Connection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection)`，`[User-Agent](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent)`）和在 Fetch 规范中定义为  [禁用首部名称](https://fetch.spec.whatwg.org/#forbidden-header-name)  的其他首部，允许人为设置的字段为 Fetch 规范定义的  [对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)。该集合为：
   - `[Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)`
   - `[Accept-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)`
   - `[Content-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)`
   - `[Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)`
     - `text/plain`
     - `multipart/form-data`
     - `application/x-www-form-urlencoded`）

## 非简单请求

非简单请求会发送**预检请求**并得到**CORS 响应**

### 预检请求 OPTIONS

预检请求的方法是`OPTIONS`，同时会加上`Origin`源地址和`Host`目标地址，这很简单。同时也会加上两个关键的字段:

- Access-Control-Request-Method, 列出 CORS 请求用到哪个 HTTP 方法
- Access-Control-Request-Headers，指定 CORS 请求将要加上什么请求头

```
OPTIONS / HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
```

### CORS 响应头

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Expose-Headers`
- `Access-Control-Max-Age`
- `Access-Control-Allow-Credentials`

<aside>
⚠️ 当请求附带身份凭证（如cookie）时，**不能**将`Access-Control-Allow-Origin/Methods/Headers`设为`”*”`

</aside>

<aside>
⚠️ 如果服务端指定了具体的域名而非“*”，那么响应首部中的 `[Vary](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Vary)` 字段的值必须包含 `[Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin)`。这将告诉客户端：服务器对不同的源站返回不同的内容。

</aside>

```
Access-Control-Allow-Origin: https://mozilla.org
Vary: Origin
```

<aside>
⚠️ 实际的响应中**只包含**`Access-Control-Allow-Origin`

</aside>

# 前端安全

## Reference

[前端安全](https://juejin.cn/post/7009959778147385374)

[Web 安全 - 简单案例演示如何使用 CSP 来防止 XSS 攻击 (qq.com)](https://mp.weixin.qq.com/s/hRk_yW-kbEmwxrYuLlNM1A)

[前端安全系列（一）：如何防止 XSS 攻击？ - 美团技术团队 (meituan.com)](https://tech.meituan.com/2018/09/27/fe-security.html)

[前端安全系列（二）：如何防止 CSRF 攻击？ - 美团技术团队 (meituan.com)](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

安全防范知识点

[https://juejin.cn/post/7060039000622366756?share_token=9d50fae6-4472-48ab-a324-6b372e27948a](https://juejin.cn/post/7060039000622366756?share_token=9d50fae6-4472-48ab-a324-6b372e27948a)

## xss 攻击 - 盗取登录态信息

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。

1. 反射型

   攻击者通过在 URL 中插入恶意代码（如`<script>`），这段代码被拼接到 DOM 中，发送用户的信息（如 Cookie）

2. 存储型

   攻击者将恶意脚本发送到服务端（如网站留言板），服务端又发送给其他用户，发送用户的信息（如 Cookie）

### 防范

1. 对于外部传入的内容进行充分**转义**
2. 开启 **CSP**（Content Security Policy，内容安全策略），规定客户端哪些外部资源可以加载和执行，降低 XSS 风险

   ```jsx
   // 只允许加载本站资源
   Content-Security-Policy: default-src 'self'
   //只允许加载 https 协议图片
   Content-Security-Policy: img-src 'https://*'
   //不允许加载任何来源框架
   Content-Security-Policy: child-src 'none'

   ctx.set('Content-Security-Policy', 'default-src', 'self')
   ```

3. 设置 **Cookie httpOnly** 属性，禁止 JavaScript 读取 Cookie

   `response.addHeader('Set-Cookie', 'uid-112; Path=/;HttpOnly')`

## CSRF 攻击-利用登录态信息

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入**第三方网站**，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站**已经获取的注册凭证**，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的

### 防范

1. 检查 referer 请求头字段（可能被修改）
2. 验证码
3. CSRF Token（不放在 Cookie）
4. CSRF Cookie（请求域名`a.com` → `a.com/csrfcookie=radom`）
5. CSP
6. SameSite

   ```
   Set-Cookie: foo=1; Samesite=Strict
   Set-Cookie: bar=2; Samesite=Lax(默认)
   Set-Cookie: baz=3
   当用户从 a.com 点击链接进入 b.com 时，
   foo 这个 Cookie 不会被包含在 Cookie 请求头中，
   但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。

   但假如这个请求是从 a.com 发起的对 b.com 的异步请求，
   或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。
   ```

### MITM 中间人攻击

# DNS(Domain Name System)

DNS 位于应用层（OSI 第七层）

DNS 是基于 UDP 和 TCP 的

DNS 通常使用 UDP，若传输的消息过大（超过 512 字节），会切换到 TCP

### DNS 的请求过程

1. 首先，浏览器会从**自身的 DNS 缓存**中去查找（chrome://net-internals/#dns），如果没有则进行下一步
2. 然后，浏览器会先从**操作系统里的 DNS 缓存**中找，windows 系统中，命令行 ipconfig/displaydns 查看，linux 上的 NSCD 缓存服务，如果没有则进行下一步
3. 从计算机**host 文件**里找，如果没有则进行下一步
4. 请求**本地域名服务器**（可以认为是你的网络接入服务器商提供，比如中国电信，中国移动，阿里云等域名供应商），如果该服务器有缓存，则直接返回，若没有，则下一步
5. 若上一步都没命中，向**根域名服务器**迭代请求

### A 记录和 CNAME 记录

一种指向关系

1. A 记录/Address 记录

   域名 [www.xx.com](http://www.xx.com/) → IP 111.111.111.111

   主机名 DD → 222.222.222.222

   最终的域名与 IP 的对应关系这条记录，就是 A 记录

2. CNAME
   为什么要区分 A 记录和 CNAME？我们可以把 CNAME 记录叫做别名记录，就是小名。
   比如 A 记录为：
   [www.credit.com](http://www.credit.com/) → 111.111.111.111
   那么可能有多个 CNAME 记录
   [www.100fen.com](http://www.100fen.com/) → [www.credit.com](http://www.credit.com/)[www.baifen.com](http://www.baifen.com/) → [www.credit.com](http://www.credit.com/)

# TCP

## Reference

[你还在为 TCP 重传、滑动窗口、流量控制、拥塞控制发愁吗？](https://juejin.cn/post/6854573218683387917)

[为什么 TCP 建立连接需要三次握手 (qq.com)](https://mp.weixin.qq.com/s/rhEGJOzpJljndiMNkbfxGg)

[请收好这一份详细 & 清晰的计算机网络基础学习指南 (qq.com)](https://mp.weixin.qq.com/s/BoN1xfn6MUCUOPfQoqug0A)

[计算机网络基础知识总结 (qq.com)](https://mp.weixin.qq.com/s/6ERTR4UsUM0Gq6NjTSRrNg)

---

- TCP 提供一种面向连接的、可靠的字节流服务。
- 在一个 TCP 连接中，仅有两方进行彼此通信。广播和多播不能用于 TCP。
- **TCP 使用校验和，确认和重传机制来保证可靠传输**。
- TCP 给数据分节进行排序，并使用累积确认保证数据的顺序不变和非重复。
- TCP 使用滑动窗口机制来实现流量控制，通过动态改变窗口的大小进行拥塞控制。

IP 协议中的两大关键要素是源 IP 地址和目标 IP 地址。传输层的主要作用是**实现应用程序之间的通信**。因此传输层的协议中新增了三个要素：源端口号，目标端口号和协议号。通过这五个信息，可以唯一识别一个通信。

- 校验和 (Checksum):

TCP 的校验和和 UDP 的相似，区别在于 TCP 的校验和无法关闭（UDP 可以在校验和字段填 0 ，来关闭校验）**与 UDP 数据报一样，TCP 数据报段在计算校验和时也包括一个 12 字节长的伪首部。**

注：TCP 数据报段伪首部起到双重校验的作用：1、通过伪首部的 IP 地址检验，TCP 可以确认 IP 没有接受不是发给本机的数据报；2、通过伪首部的协议字段检验，TCP 可以确认 IP 没有把应该传给其他高层协议（比如 UDP、ICMP 或者 IGMP）的数据报传给 TCP 。

![https://img.halfrost.com/Blog/ArticleImage/90_30.png](https://img.halfrost.com/Blog/ArticleImage/90_30.png)

## 三次握手

![Untitled](Network%20b634a/Untitled.jpeg)

![Untitled](Network%20b634a/Untitled%2011.png)

1⃣️🤝：S 确认 C 发 S 收

2⃣️🤝：C 确认 C 收 发 S 收 发

3⃣️🤝：S 确认 C 收 S 发

因此：

C 在 2⃣️🤝 后就进入 ESTABlished 状态

S 在 3⃣️🤝 后才进入 ESTABlished 状态

### 为什么要 3⃣️🤝

1. 确认双方的收发能力，没有 3⃣️🤝 服务端无法确认自己的发送能力和客户端的接收能力
2. 阻止重复历史连接的初始化。**客户端可能会发送多个 SYN 包**，若服务端在完成其中一个 SYN 包的 TCP 连接后收到第二个 SYN 包，会造成空连接，浪费资源
3. 减轻 DDoS 攻击的影响。由于建立连接需要大量系统资源，若两次握手则很容易被 DDoS 攻击，三次握手的话在第三次 ACK 前服务端处于半连接的状态，影响较小

## 四次挥手

![Untitled](Network%20b634a/Untitled%201.jpeg)

1. 第一次挥手(FIN=1，seq=x)

   假设客户端想要关闭连接，客户端发送一个 FIN 标志位置为 1 的包，表示自己已经没有数据可以发送了，但是仍然可以接受数据。

   发送完毕后，客户端进入 `FIN_WAIT_1` 状态。

2. 第二次挥手(ACK=1，ACKnum=x+1)

   服务器端确认客户端的 FIN 包，发送一个确认包，表明自己接受到了客户端关闭连接的请求，但还没有准备好关闭连接。

   发送完毕后，服务器端进入 `CLOSE_WAIT` 状态，客户端接收到这个确认包之后，进入 `FIN_WAIT_2` 状态，等待服务器端关闭连接。

3. 第三次挥手(FIN=1，seq=y)

   服务器端准备好关闭连接时，向客户端发送结束连接请求，FIN 置为 1。

   发送完毕后，服务器端进入 `LAST_ACK` 状态，等待来自客户端的最后一个 ACK。

4. 第四次挥手(ACK=1，ACKnum=y+1)

   客户端接收到来自服务器端的关闭请求，发送一个确认包，并进入 `TIME_WAIT` 状态，等待可能出现的要求重传的 ACK 包。

   服务器端接收到这个确认包之后，关闭连接，进入 `CLOSED` 状态。

   客户端等待了某个固定时间（两个最大段生命周期，2MSL，2 Maximum Segment Lifetime）之后，没有收到服务器端的 ACK ，认为服务器端已经正常关闭连接，于是自己也关闭连接，进入 `CLOSED` 状态。

### 为什么要四次挥手而不是三次

因为客户端请求释放时，服务器可能还有数据需要传输给客户端，因此服务端要先响应客户端 FIN 请求（服务端发送 ACK），然后数据传输，传输完成后，服务端再提出 FIN 请求（服务端发送 FIN）；而连接时则没有中间的数据传输，因此连接时可以 ACK 和 SYN 一起发送。

### 为什么客户端释放最后需要 TIME-WAIT 等待 2MSL

1. 为了保证客户端发送的**最后一个 ACK 报文能够到达服务端**。若未成功到达，则服务端超时重传 FIN+ACK 报文段，客户端再重传 ACK，并重新计时。
2. **防止已失效的连接请求报文段出现在本连接中**。TIME-WAIT 持续 2MSL 可使本连接持续的时间内所产生的所有报文段都从网络中消失，这样可使下次连接中不会出现旧的连接报文段。

## TCP 滑动窗口

![https://img.halfrost.com/Blog/ArticleImage/90_32.png](https://img.halfrost.com/Blog/ArticleImage/90_32.png)

发送方-发送窗口：

```
窗口以前：已经发送并确认了的分组
窗口之中：包含了**已经发送但未确认**的分组和**允许发送但还未发送**的分组
窗口之后：缓存中还不允许发送的分组
```

（滑动窗口是什么）窗口是缓存的一部分，用来暂时存放字节流。发送方和接收方各有一个窗口，接收方通过 TCP 报文段中的窗口字段告诉发送方自己的窗口大小，发送方根据这个值和其它信息设置自己的窗口大小。

（滑动窗口内是什么）发送窗口内的字节都允许被发送，接收窗口内的字节都允许被接收。

（发送窗口怎么滑动）如果发送窗口左部的字节已经发送并且收到了确认，那么就将发送窗口向右滑动一定距离，直到左部第一个字节不是已发送并且已确认的状态

（接收窗口怎么滑动）接收窗口的滑动类似，接收窗口左部字节已经发送确认并交付主机，就向右滑动接收窗口。

（累积确认）接收窗口只会对窗口内**最后一个按序到达的字节**进行确认，也就是**累积确认**

## TCP 可靠传输

### 为什么说 TCP 是可靠的呢

我认为 TCP 可靠是由 3 方面组成的

第一个是可靠的**网络环境**，通过拥塞控制，减少拥塞导致的报文丢失

第二个是可靠的**连接**，通过三次握手和四次挥手来保证连接的可靠

第三个是可靠的**数据**，通过报文校验，ACK 应答，超时重传，流量控制等方式来保证数据的可靠

## TCP 流量控制

流量控制是为了控制发送方发送速率，保证接收方来得及接收。

接收方发送的确认报文中的窗口字段可以用来控制发送方窗口大小，从而影响发送方的发送速率。将窗口字段设置为 0，则发送方不能发送数据。

## TCP 拥塞控制

如果网络出现拥塞，分组将会丢失，此时发送方会继续重传，从而导致网络拥塞程度更高。因此当出现拥塞时，应当控制发送方的速率。这一点和流量控制很像，但是出发点不同。流量控制是为了让接收方能来得及接受，而拥塞控制是为了**降低整个网络的拥塞程度**。

TCP 主要通过四种算法来进行拥塞控制：慢开始、拥塞避免、快重传、快恢复。发送方需要维护一个叫做拥塞窗口（cwnd）的状态变量。注意拥塞窗口与发送方窗口的区别，**拥塞窗口只是一个状态变量，实际决定发送方能发送多少数据的是发送方窗口**。

为了便于讨论，做如下假设：

1. 接收方有足够大的接收缓存，因此不会发生流量控制；
2. 虽然 TCP 的窗口基于字节，但是这里设窗口的大小单位为报文段。

![https://img.halfrost.com/Blog/ArticleImage/90_34.png](https://img.halfrost.com/Blog/ArticleImage/90_34.png)

### 1. 慢开始与拥塞避免

1. 发送的最初执行**慢开始**，设置拥塞窗口 cwnd=1 和一个慢开始门限 ssthresh，发送方只能发送 1 个报文段
2. 之后每个轮次都将 **拥塞窗口 cwnd 加倍**
3. 当 拥塞窗口 cwnd >= 慢开始门限 ssthresh 时，进入**拥塞避免**，每个轮次只将 cwnd **加 1**。
4. 如果出现了**超时**，则令 **ssthresh = cwnd/2**，然后**重新执行慢开始**。

### 2. 快重传与快恢复

在接收方，要求**每次接收到报文段都应该发送对已收到有序报文段的确认**，例如已经接收到 M1  和 M2，此时收到 M4，应当发送对 M2  的确认。

在发送方，如果收到**三个重复确认**，那么可以确认下一个报文段丢失，例如收到三个 M2 ，则 M3  丢失。此时执行**快重传**，立即重传下一个报文段。

在这种情况下，只是丢失个别报文段，而不是网络拥塞，因此执行**快恢复**，令 ssthresh = cwnd/2 ，cwnd = ssthresh，注意到此时**直接进入拥塞避免**。

![https://img.halfrost.com/Blog/ArticleImage/90_35.png](https://img.halfrost.com/Blog/ArticleImage/90_35.png)

## **TCP Fast Open**

HTTPS 和 HTTP 使用 TCP 协议进行传输，也就意味着必须通过三次握手建立 TCP 连接，但一个 RTT 的时间内只传输一个 syn 包是不是太浪费？能不能在 syn 包发出的同时捎上应用层的数据？其实是可以的，这也是 TCP Fast Open 的思路，简称 TFO。具体原理可以参考 RFC7413
