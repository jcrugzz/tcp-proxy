var net = require('net'),
    concat = require('concat-stream'),
    test = require('tap').test;

var tcpProxy = require('../');

var proxyPort = 9000,
    serverPort = 9001;

var data = 'Hello\n',
    target = { target: { host: '127.0.0.1', port: serverPort }};

test('test a simple proxy', function (t) {
  t.plan(3);

  var server,
      proxyServer,
      socket;

  function cleanup() {
    server.close();
    proxyServer.close();
    socket.destroy();

    t.pass('cleanup success');
  }

  function onError(err) {
    t.fail(err);
    cleanup();
  }

  server = net.createServer(function (sock) {
    sock.on('data', function (chunk) {
      t.equals(''+chunk, data, 'server recieved data through proxy');
      sock.write(data);
    });
  });

  server.on('error', onError);
  server.listen(serverPort, startProxy);
  function startProxy() {
    proxyServer = tcpProxy.createServer(target);
    console.log('starting proxy');
    proxyServer.on('error', onError)
    proxyServer.listen(proxyPort, runTest);
  }

  function runTest() {
    socket = net.connect(proxyPort);
    console.log('writing data');
    socket.write(data);
    socket.on('data', function (d) {
      t.equals(''+d, data, 'client recieved data from server through proxy');
      cleanup();
    });

  }
});
