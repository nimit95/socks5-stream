
const socks5Stream = require('../src/index');
const net = require('net');
// Server mock

var server = net.createServer((socket) => {
  // Create a new socks5 stream without Authentication
  var sockStream = new socks5Stream(socket);

  //Create a new socks5 stream with Username and Password Authentication
  var sockStreamAuth = new socks5Stream(socket, {
    username: "username",
    password: "password",
    authType: "username"
  });

  //Piping the data to sock5 stream
  socket.pipe(sockStream).once('data', (data) => {
    console.log('<HOST>,<PORT> ==> ' + data.toString());
    sockStream.acceptConnection(true);
    sockStream.on('data', (chunk) => {
      // console.log(chunk.toString());
    })
  })
});

server.listen(8124, () => {
  console.log('server bound');
});
