var util = require('util'),
    EventEmitter = require('eventemitter3'),
    stream = require('stream'),
    proxyStream = require('./proxy-stream');

var Duplex = stream.Duplex;

module.exports = TcpProxy;

util.inherits(TcpProxy, EventEmitter);

function TcpProxy (options) {
  if (!(this instanceof TcpProxy)) { return new TcpProxy(options) }
  events.EventEmitter.call(this);

  this.plugin = options.plugin;


};

TcpProxy.prototype.proxy = function (socket, options) {
  this.socket = socket;

  options.target = options.target || this.target;
  this.proxyStream = new proxyStream(options);

  //
  // Remark: is this stream going to emit the error or is the source socket
  // emitting it when it fails to proxy?
  //
  // TODO: retry should exist
  //
  this.proxyStream.on('error', this.emit.bind(this, 'error', proxyStream));

  this.socket.pipe(this.proxyStream).pipe(this.socket);


};
