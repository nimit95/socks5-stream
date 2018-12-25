
const constants = require('./constants');
var checkIntialSocksChunk = function(chunk) {
  if(chunk.length < 3 || chunk[0]!=constants.socksVersion || chunk[1] == 0x00 || chunk.length !== parseInt(chunk[1]) + 2) 
    return false
  return true
}

var checkConnectResponse = function(chunk) {
  if(chunk.length < 4 || chunk[0]!== constants.socksVersion || chunk[2] !== 0x00) return false;

  if(chunk[3] === constants.SOCKS_ADDRESS.IPV4) {
    return chunk.length === 10;
  } else if(chunk[3] === constants.SOCKS_ADDRESS.IPV6) {
    return chunk.length === 22;
  } else if(chunk[3] === constants.SOCKS_ADDRESS.HOSTNAME){
    return chunk.length > 3 && chunk.length === 7 + parseInt(chunk[4]);
  } else {
    return false;
  }

}

var generateInitialHandshakeResponse = function() {
  var buf = new Buffer.alloc(2,0x00, 'hex');
  buf[0] = constants.socksVersion;
  buf[1] = 0x00;
  return buf;
}


var connectionSuccessfulResponse = function() {
  var buf = new Buffer.alloc(4 + this.buf.length, 0x00, 'hex');
  buf[0] = constants.socksVersion;
  buf[1] = 0x00;
  buf[2] = 0x00;
  buf[3] = 0x01;
  this.buf.copy(buf, 4, 0);
  return buf;
}

var connectionUnsuccessfulResponse = function() {
  var buf = new Buffer.alloc(4 + this.buf.length, 0x00, 'hex');
  buf[0] = constants.socksVersion;
  buf[1] = 0x00;
  buf[2] = 0x00;
  buf[3] = 0x01;
  this.buf.copy(buf, 4, 0);
  return buf;
}

var getHostnamePort = function(chunk) {
  this.addressType = chunk[3];
  if(chunk[3] === constants.SOCKS_ADDRESS.IPV4) {
    let hostname = "", port = "";
    this.buf = chunk.slice(4);
    chunk.slice(4, 8).forEach(value => {
      hostname += parseInt(value) + '.';
    });
    chunk.slice(8).forEach(value => {
      port += parseInt(value);
    });
    return {
      hostname: hostname.slice(0, -1),
      port: port
    };
  } 
  if(chunk[3] === constants.SOCKS_ADDRESS.IPV6) {
    let hostname = "", port = "";
    this.buf = chunk.slice(4);
    chunk.toString('hex', 4, chunk.length - 2).split('').forEach((value, idx) => {
      
      hostname += value;
      
      if(idx%4 === 3){
        // console.log(idx);
        hostname = hostname + '.'
      }

    });
    chunk.slice(chunk.length - 2).forEach(value => {
      port += parseInt(value);
    });
    return {
      hostname: hostname.slice(0, -1),
      port: port
    };
  } 
  if(chunk[3] === constants.SOCKS_ADDRESS.HOSTNAME){
    let hostname = "", port = "";
    this.buf = chunk.slice(4);
    chunk.slice(chunk.length - 2).forEach(value => {
      port += parseInt(value);
    });
    return {
      hostname: chunk.toString('ascii', 5, 5 + parseInt(chunk[4])),
      port: port
   };
  }

  return null;
}

module.exports.checkIntialSocksChunk = checkIntialSocksChunk;
module.exports.checkConnectResponse = checkConnectResponse;
module.exports.generateInitialHandshakeResponse = generateInitialHandshakeResponse;
module.exports.connectionSuccessfulResponse = connectionSuccessfulResponse;
module.exports.connectionUnsuccessfulResponse = connectionUnsuccessfulResponse;
module.exports.getHostnamePort = getHostnamePort;