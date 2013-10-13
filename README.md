# tcp-proxy

Exactly what you would expect, a simple tcp proxy written in node. Inspiration
from [`node-http-proxy`][http-proxy].

## Work in Progress

## Example

Simple tcp proxy

```js

var tcpProxy = require('tcp-proxy');

var server = tcpProxy.createServer({
  target: {
    host: '127.0.0.1',
    port: 9000
  }
});

server.listen(8000);

```

## API



[http-proxy]: https://github.com/nodejitsu/node-http-proxy
