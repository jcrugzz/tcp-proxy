var stream = require('stream'),
    net = require('net');

var Duplex = stream.Duplex;

module.exports = ProxyStream;

util.inherits(ProxyStream, Duplex);

function ProxyStream (options) {
  Duplex.call(this, { highWaterMark: Infinity });
  //
  // TODO: Add options check
  //
  this.target = options.target;
  this.retry = options.retry;

  this.socket = net.connect(this.target);

  //
  // Remark: Does this work or am I too high?
  // I want this to be magical damnit!
  //
  this.pipe(this.socket).pipe(this);

}

ProxyStream.prototype._read = function (n) {
  //
  // Remark: If im getting piped to, do I need to be implemented
  //
};

ProxyStream.prototype._write = function (chunk, encoding, callback) {
  //
  // Remark: Not sure what to do here yet
  //
  callback(data);
};

