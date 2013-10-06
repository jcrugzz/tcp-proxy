var util = require('util'),
    net = require('net'),
    tls = require('tls'),
    EventEmitter = require('eventemitter3'),
    stream = require('stream');

var Duplex = stream.Duplex;

module.exports = TcpProxy;

util.inherits(TcpProxy, EventEmitter);

function TcpProxy (options) {
  EventEmitter.call(this);
  if (!(this instanceof TcpProxy)) { return new TcpProxy(options) }
  //
  // Remark: lulz damnit we are only an eventEmitter to propagate errors,
  // I JUST WANT ONE FUNCTION WITH EE FANCINESS
  //

};

TcpProxy.prototype.proxy = function (socket, options) {
  this.socket = socket;

  options.target = options.target || this.target;
  //
  // TODO: Make this depend on whether we need to proxy as TLS to the backend or not
  // So essentially this should be more variable
  //
  this.proxySock = options.ssl
    ? tls.connect(options.ssl, options.target)
    : net.connect(options.target);

  //
  // Remark: is this stream going to emit the error or is the source socket
  // emitting it when it fails to proxy?
  //
  // I am assuming there can probably be errors from either stream, the proxy
  // stream may be the only case that we want to attempt a reconnect.
  //
  // TODO: retry should exist
  //
  this.proxySock.on('error', this.emit.bind(this, 'error'));
  this.socket.on('error', this.emit.bind(this, 'error'));

  this.proxySock.pipe(this.socket).pipe(this.proxySock);


};
