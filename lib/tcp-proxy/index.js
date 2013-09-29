var net = require('net'),
    util = require('util'),
    events = require('events'),
    stream = require('stream');

var Duplex = stream.Duplex;

module.exports = TcpProxy;

util.inherits(TcpProxy, events.EventEmitter);

function TcpProxy (options) {
  var self = this;
  events.EventEmitter.call(this);

  this.plugin = options.plugin;
  if(this.plugin && !(this.plugin instanceof Duplex)) {

  }

};

TcpProxy.prototype.proxy = function (socket, options) {

};
