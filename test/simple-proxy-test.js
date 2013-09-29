var net = require('net'),
    concat = require('concat-stream'),
    test = require('tap').test;

var tcpProxy = require('../'),

var proxyPort = 9000,
    serverPort = 9001;

var data = 'Hello\n',
    target = { target: { host: '127.0.0.1', port: serverPort }};

test('test a simple proxy', function (t) {
  t.plan(2);
  var server,
      proxyServer,
      socket;

  function cleanup() {
    server.close();
    proxy.close();
    socket.destroy();

    t.pass('cleanup success');
  }

  server = net.createServer(function (socket) {
    socket.pipe(concat(function (body) {
      t.equals(body, data);
      cleanup();
    }));
  });

  server.listen(serverPort, runProxy);
  function startProxy() {
    proxyServer = tcpProxy.createServer();

    proxyServer.on('error', t.fail.bind(null))
    proxyServer.listen(proxyPort, runTest);
  }

  function runTest() {
    socket = net.connect(proxyPort);

    socket.write(data);
  }
});
