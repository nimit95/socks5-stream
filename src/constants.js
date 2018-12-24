

const socksVersion = 0x05

const states = {
  NO_CONNECTION:0,
  CONNECTING:1,
  CONNECTED: 3,
  DISCONNECTED: 4
} 

const SOCKS_ADDRESS = {
  IPV4: 0x01,
  HOSTNAME: 0x03,
  IPV6: 0x04
}

module.exports.states = states;
module.exports.SOCKS_ADDRESS = SOCKS_ADDRESS;
