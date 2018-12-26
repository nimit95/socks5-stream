# SOCKS5 STREAM
A lightweight module which can transform any server into a SOCKS5 server. It does this by transforming incoming SOCKS5 stream into its respective protocol stream. It is an easily manageable and this package doesn't have any dependency. Now supports SOCKS5 Username/Password Authentication on your server.

## Installation
```bash
npm install socks5-stream
```

## Usage

The first event emiited by the stream will always be a destination host and port in format &lt;HOSTNAME&gt;,&lt;PORT&gt;.<br>
You can use this information to perform two actions -

* Accept connection by calling `sockStreamObj.acceptConnection(true)`
* Reject the connection by calling `sockStreamObj.acceptConnection(false)`

After this all the events will have your PROTOCOL data. This data can consumed using the 'data' event or can be further piped into other streams.

If to use SOCKS5 Username/Paswword Authentication, pass the auth details as second params. The object should contain, authType as "username" and the user specifc username, password. For further details check the bottom example. 

Simple Example of accepting a connection and printing the incoming data(In this case HTTP) 
```javascript
const socks5Stream = require('socks5-stream');
const net = require('net');
// Server mock 

var server = net.createServer((socket) => {
  // Create a new socks5 stream without Authentication
  var sockStream = new socks5Stream(socket);

  //Create a new socks5 stream with Username and Password Authentication
  var sockStreamAuth = new socks5Stream(socket, {
    username:"username",
    password:"password",
    authType:"username"
  });

  //Piping the data to sock5 stream
  socket.pipe(sockStream).once('data', (data) => {
    console.log('<HOST>,<PORT> ==> ' + data.toString());
    sockStream.acceptConnection(true);
    sockStream.on('data', (chunk) => {
      //Actual data
      console.log(chunk.toString());
    })
  })
});

server.listen(8124, () => {
  console.log('server bound');
});
```

Can test the server using cURL command
`curl --socks5-hostname localhost:8124 http://www.google.com`

# Note
* Currently, only SOCKS5 no authentication and Username/Password method are supported.

If you guys want me to support additional functionality like AUTHENTICATION and CONNECT, BIND, please create issue on this repo. I will be more than happy to continue its development.  
