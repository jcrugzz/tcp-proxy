var net = require('net'),
    tls = require('tls'),
    tcpProxy = require('./tcp-proxy/');

module.exports = tcpProxy;

module.exports.createServer =
module.exports.createProxyServer = function createServer(options) {
  var server = options.ssl
    ? tls.createServer(options.ssl, requestHandler);
    : net.createServer(requestHandler);

  var proxy = tcpProxy(options);
  proxy.on('error', server.emit.bind(server, 'error'));

  function requestHandler(socket) {
    proxy.proxy(socket, options);
  }

  return server;
};


