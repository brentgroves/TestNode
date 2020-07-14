var udp = require('dgram');

// -------------------- udp client ----------------

var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('siddheshrane');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');
/*
CNC 103 
Frame termination character is ASCII 0x25 %
Seek - Find start of frame ASCII 0x7D character }
Skip start of frame character
Test device id 103. ASCII integer +dddd. Continue/Fail
Find next comma. 44, 0x2C
Skip comma
Read part counter. ASCII integer
*/

//sending multiple msg
client.send([data1,data2],2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});
