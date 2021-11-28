# 事件

## 事件类型

1. 鼠标事件 click...
2. 键盘事件 keydown...
3. ...

## 事件流

事件的产生与流动首先由父元素向子元素传递，这一过程称为**捕获(capture)**，随后由子元素向父元素传递，这一过程称为**冒泡(bubble)**。

通过事件监听可以得到事件(event)：

```javascript
// 捕获事件，第三个参数为 true
DOMEle.addEventListener("click", (e) => callback(), true);
// 冒泡事件，第三个参数为 false，可省略
DOMEle.addEventListener("click", (e) => callback(), false);
```

冒泡是默认的事件监听的方式。事件流可能会产生额外的影响（比如点击子元素，触发父元素），所有我们在必要的时候得取消它：

```javascript
DOMEle.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
  },
  false
);
```

# 网络

## URL

URL：Uniform Resource Locator 统一资源定位符

格式：schema://host[:port#]/path/[?query-string&query-string][#anchor]

DNS 域名 -> ip 地址

例如: https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL#%E6%A6%82%E8%BF%B0

其中：
schema: https
host: developer.mozilla.org
port: 不加默认 http 80 https 443
path: zh-CN/docs/Learn/Common_questions/What_is_a_URL
anchor: #%E6%A6%82%E8%BF%B0

例如: https://developer.mozilla.org/zh-CN/search?q=URL

其中：
query: q=端口

## HTTP

HTTP 请求报文

```
HTTP/1.1 HTTP/2

GET www.baidu.com HTTP/1.1
Content-Type: application/json
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.9
Cache-Control: no-cache

{username: 'kwun', password: 123456 }
```

HTTP 响应报文

```
HTTP/2 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html;charset=utf-8

{ token: "...."}
```

状态码：

1. 1xx 正在。。
2. 2xx 成功
3. 3xx 重定向
4. 4xx 服务端错误
5. 5xx 服务器问题

# 网络编程

```javascript
fetch(url, [config]);

// eg:
fetch("http://localhost:8080", {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify({ username, password }),
});
```
