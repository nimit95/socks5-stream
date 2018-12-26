

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
