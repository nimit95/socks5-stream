

module.exports.socksVersion = 0x05;

module.exports.states = {
  NO_CONNECTION:0,
  CONNECTING:1,
  CONNECTED: 3,
  DISCONNECTED: 4,
  AUTHENTICATION: 5
} 

module.exports.authTypes = {
  username:1
}

module.exports.SOCKS_ADDRESS = {
  IPV4: 0x01,
  HOSTNAME: 0x03,
  IPV6: 0x04
}

module.exports.SOCKET_ERRORS = {
  NOT_DEFINED : "Socket is not defined or valid",
  WRONG_AUTH : "Wrong Authentication Details givem",
  INITIAL_HANSHAKE : "Got Wrong initial Handshake(not 5,0,x)",
  INVALID_AUTH_PACKET: "Invalid Authentication Packet received",
  INVALID_CONNECT: "Got Wrong Handshake(not 5,1,x,x,x...)",
  NO_CONNECTION : "Connection not established yet"
}
