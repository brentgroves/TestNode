var moment = require('moment'); // require
console.log(moment().format()); 

var Current_Value = {};
var Datagram_Key = 1;
var Set_No = 2;
//Current_Value[Datagram_Key] = {};
if (Current_Value[Datagram_Key] === undefined)
{
    Current_Value[Datagram_Key] = {};
    Current_Value[Datagram_Key].IncrementBy = 2;
}
if (Current_Value[Datagram_Key][Set_No] === undefined)
{
    Current_Value[Datagram_Key][Set_No] = {};
}
var index = 3;

if (Current_Value[Datagram_Key][Set_No][index] === undefined)
{
    Current_Value[Datagram_Key][Set_No][index] = 3;
}

index = 5;

if (Current_Value[Datagram_Key][Set_No][index] === undefined)
{
    Current_Value[Datagram_Key][Set_No][index] = 5;
}

//Current_Value[Datagram_Key][Set_No] = {};


console.log(`Current_Value=${JSON.stringify(Current_Value)}`);

var length = 22
var blocks = Math.trunc(length / 10);
console.log(`blocks=${blocks}`);