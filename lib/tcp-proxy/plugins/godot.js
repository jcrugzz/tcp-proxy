var util = require('util'),
    net = require('net'),
    stream = require('stream'),
    jsonStream = require('json-stream');

var Duplex = stream.Duplex,
    extend = util._extend;

//
// Remark: So this is a duplex stream but in reality we are just
// using it to write to various destinations.
//
module.exports = Godot;

util.inherits(Godot, Duplex);
//
// TODO: OMG REMOVE BIND CAUSE PERFFF GUYZZ
// WHY CANT WE HAVE NICE THINGS
//
function Godot (options) {
  Duplex.call(this)

  this.targets = this.parseTargets(options.targets || options.target);

  if(!this.targets) {
    throw new Error('FATAL, I NEED TO PROXY TO THINGS');
  }

  this.sockets = {};
  this.ring = new HashRing(this.targets);
  this.on('pipe', this._onPipe.bind(this));
};

Godot.prototype._onPipe = function (source) {
  var self = this,
      parser = jsonStream();

  //
  // Remark: Ok guys so here we are getting godot data events
  // that we want to parse and send to various destinations.
  // Oh yea thats the part I forgot about.
  //
  parser.on('readable', function (data) {
    var first = parser.read();
    var key = first.meta && first.meta.key;

  });

  source.pipe(parser);

};

Godot.prototype.parseTargets = function (targets) {
    targets = !Array.isArray(targets)
      ? [targets]
      : targets;
    //
    // Remark: So we should ensure its host/port eh?
    //
    return targets.map(function (target) {
      return target instanceof Object
        ? [target['host'], target['port']].join(':')
        : target
    });
};

//
// Remark: Lulz who needs these methods?
//
Godot.prototype._read = function (n) {

};

Godot.prototype._write = function (chunk, encoding, callback) {

};
