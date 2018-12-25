
const { Transform } = require('stream');
const util = require('util');
const constants = require('./constants'); 
const socksUtils = require('./socksUtils');
const utils = require('./utils')

/**
 * @param {net.Socket} socket 
 *  Socket from which the Socks stream is comming.
 * @param {Object} authDetails
 *  Optional for authorization if any, Defaults to undefined
 * {
 *     //In case of username and password 
 *    authType:"username",
 *    username:<username>,
 *    password:<password>
 *    
 *  
 * }
 */
const socks5Stream = function(socket, authDetails) {

  if(!utils.isSocketObjValid()) {
    return new Error("Socket is Not defined");
  } 

  if(!utils.validateAuth()) {
    return new Error("Wrong Authentication Details");
  }
  
  this.authDetails = authDetails;
  this._socket = socket;

  Transform.call(this);

  this.state = constants.states.NO_CONNECTION;
  
}

util.inherits(socks5Stream, Transform);

socks5Stream.prototype._transform = function(chunk, encoding, callback) {

  // console.log(chunk);

  if(this.state === constants.states.NO_CONNECTION) {
  
    if(!socksUtils.checkIntialSocksChunk(chunk)) {
      return callback(new Error("Got Wrong initial Handshake(not 5,0,x)"));
    }
    //We need to conect 
    this._socket.write(socksUtils.generateInitialHandshakeResponse(), () => {
      this.state = constants.states.CONNECTING;
      callback(null);
    });

  }

  if(this.state === constants.states.CONNECTING) {
    if(!socksUtils.checkConnectResponse(chunk)) {
      return callback(new Error("Got Wrong Handshake(not 5,1,x,x,x...)"));
    }

    let hostnamePortObj = socksUtils.getHostnamePort(chunk);

    return callback(null,`${hostnamePortObj.hostname},${hostnamePortObj.port}`);
  }

  if(this.state === constants.states.CONNECTED) {
    // console.log('connected', chunk.toString());
    callback(null, chunk);
  }

  if(this.state === constants.states.DISCONNECTED) {
    callback(null);
  }
  this.acceptConnection = function(flag) {
    if(this.state === constants.states.NO_CONNECTION) {
      return callback(new Error("Connection not established yet."));
    }

    if(flag) {
      this._socket.write(socksUtils.connectionSuccessfulResponse(), () => {
        this.state = constants.states.CONNECTED;
      });

    } else {
      this._socket.write(socksUtils.connectionUnsuccessfulResponse(), () => {
        this.state = constants.states.DISCONNECTED;
        //return callback(null);
      });
    }
  }

  this._socket.on('close', () => {
    this.state = constants.states.DISCONNECTED;
  });
  this._socket.on('error', () => {
    this.state = constants.states.DISCONNECTED;
  });
  
}

module.exports = socks5Stream;
