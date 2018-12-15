# SOCKS5 STREAM
A lightweight module which can tranform any server into SOCKS5 server. It does this by transforming incoming SOCKS5 stream into its respective protocol stream. It is a easily manageable and this package doesn't have any dependency.

## Installation
```bash
npm install socks5-stream
```

## Usage

The first event emiited by the stream will always be a destination host and port in format <HOSTNAME>,<PORT>.<br>
You can use this information to perform two actions -

* Accept connection by calling `sockStreamObj.acceptConnection(true)`
* Reject the connection by calling `sockStreamObj.acceptConnection(false)`

After this all the events will have the your PROTOCOL data. This data can consumed using the 'data' event or can be further piped into other streams.

Simple Example of accepting a connection and printing the incoming data(In this case HTTP) 
```javascript
const socks5Stream = require('../src/index');
const net = require('net');
// Server mock 

var server = net.createServer((socket) => {
  // Create a new socks5 stream
  var sockStream = new socks5Stream(socket);

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

# Note
* Current the package is in its alpha stage.
* Only SOCKS5 no authentication is supported yet.

If you guys want me to support additional functionaloty like AUTHENTICATION and CONNECT, BIND, create issue on this repo. I will be more than happy to continue its development.  
