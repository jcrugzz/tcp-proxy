var net = require('net');
var TcpProxy = require('../');

var targets = [
  {
    host: 'localhost',
    port: 8001
  },
  {
    host: 'localhost',
    port: 8002
  }
];

var proxies = targets.map(function (target) {
  return new TcpProxy({
    target: target
  });
});

var nextProxy = function () {
  var proxy = proxies.shift();
  proxies.push(proxy);
  return proxy;
};

var server = net.createServer(function(socket) {
  nextProxy().proxy(socket);
});

server.listen(8000);
