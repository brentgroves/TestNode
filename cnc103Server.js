// https://node.readthedocs.io/en/latest/api/dgram/
var udp = require("dgram");

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket("udp4");

// emits when any error occurs
server.on("error", function (error) {
  console.log("Error: " + error);
  server.close();
});

// emits on new datagram msg
server.on("message", function (msg, info) {
  let fail = false;
  try {
    console.log("Data received from client : " + msg.toString());
    console.log(`Data received in hex =>${msg.toString('hex')}`);
    console.log(`Data received in ascii =>${msg.toString('ascii')}`);
    console.log(
      "Received %d bytes from %s:%d\n",
      msg.length,
      info.address,
      info.port
    );
    /*
  buffer.indexOf(value, start, encoding);
  */
    let startChar = msg.indexOf("}", 0);
    console.log(`msg.indexOf('}', 0)=>${startChar}`);
    if (startChar === -1) {
      throw new Error("No startChar in message");
    }

    let firstComma = msg.indexOf(",", startChar);
    if (firstComma === -1) {
      throw new Error("No comma in message");
    }

    console.log(`msg.indexOf(',', startChar)=>${firstComma}`);
    var id = msg.slice(startChar + 1, firstComma);
    console.log(`CNC id=>${id}`);
    var strId = id.toString();
    var numId = Number(strId); // returns NaN
    if (Number.isNaN(numId)) {
      console.log(`strId is NOT a number`);
      throw new Error("strId isNAN");
    } else {
      console.log(`strId IS a number`);
    }

    let endOfFrame = msg.indexOf('%',firstComma);
    console.log(`1. endOfFrame=>${endOfFrame}`);
    if(-1===endOfFrame){
      endOfFrame = msg.length;
      console.log(`2. endOfFrame=>${endOfFrame}`);
    }else{
      console.log(`3. endOfFrame=>${endOfFrame}`);
    }
    console.log(`4. endOfFrame=>${endOfFrame}`);

    var bufPartCounter = msg.slice(firstComma + 1, endOfFrame);
    console.log(`bufPartCounter=>${bufPartCounter}`);
    var strPartCounter = bufPartCounter.toString().trim();
    var numPartCounter = Number(strPartCounter); // returns NaN

    if (Number.isNaN(numPartCounter)) {
      throw new Error(`partCounter is NOT a number =>${strPartCounter}`);
    } else {
      console.log(`partCounter IS a number=>${strPartCounter}`);
    }

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

    //sending msg
    server.send(msg, info.port, "localhost", function (error) {
      if (error) {
        console.log(`Error ${err}`);
      }
    });
  } catch (e) {
    console.log(`caught exception! ${e}`);
  } finally {
    console.log("Data sent !!!");
  }
});

//emits when socket is ready and listening for datagram msgs
server.on("listening", function () {
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log("Server is listening at port" + port);
  console.log("Server ip :" + ipaddr);
  console.log("Server is IP4/IP6 : " + family);
});

//emits after the socket is closed using socket.close();
server.on("close", function () {
  console.log("Socket is closed !");
});

server.bind(2222);
//server.bind(2221);
/*
setTimeout(function () {
  server.close();
}, 30000);
*/