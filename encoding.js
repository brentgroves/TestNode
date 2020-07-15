// https://mathiasbynens.be/notes/javascript-escapes
//https://unicode-table.com/

// var fail = Number('42px'); // returns NaN
// Number.isNaN(123) //false
const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));

var buff=Buffer.from('7468697320697320612074c3a97374', 'hex');
console.log(`buff=>${buff}`);

/*
Buffer.byteLength(string, encoding)
With this function, you can check the number of bytes required to encode a string with a given encoding (which defaults to utf-8). 
This length is not the same as string length, since many characters require more bytes to encode. For example:
*/
var snowman = "☃";
console.log(`snowman.length=>${snowman.length}`);
var l = Buffer.byteLength(snowman);
console.log(`Buffer.byteLength(snowman)=>${l}`);

var buffer = Buffer.alloc(16);
buffer.write(snowman);
console.log(`buffer.length=>${buffer.length}`);
/*
In this example, the contents written to the buffer only consist of three 
groups (since they represent the single-character snowman), but the buffer's length is still 16, as it was initialized.
*/

/*
buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
buffer.copy allows one to copy the contents of one buffer onto another. 
The first argument is the target buffer on which to copy the contents of buffer, 
and the rest of the arguments allow for copying only a subsection of the source 
buffer to somewhere in the middle of the target buffer. For example:
*/
var frosty = Buffer.alloc(24);
var snowman2 = Buffer.from("☃", "utf-8");
frosty.write("Happy birthday! ", "utf-8");
snowman2.copy(frosty, 16);
console.log(`frosty=>${frosty}`);
console.log(`frosty.toString("utf-8", 0, 19)=>${frosty.toString("utf-8", 0, 19)}`);


/*
buffer.slice(start, end=buffer.length)
This method's API is generally the same as that of Array.prototype.slice, but with one very import difference: 
The slice is not a new buffer and merely references a subset of the memory space. 
Modifying the slice will also modify the original buffer! For example:
*/
var puddle = frosty.slice(16, 19);
console.log(`puddle.toString()=>${puddle.toString()}`);
puddle.write("___");
console.log(`frosty.toString("utf-8", 0, 19)=>${frosty.toString("utf-8", 0, 19)}`);




console.log(`smiley=>\uD83D\uDE00`);
console.log(`omega=>\u03A9`);
console.log('😄'.length);
console.log('😄'.charCodeAt());

// console.log(`smiley=>\55357`);
console.log(`a=>\u{000000000061}`);


console.log(`Ű =>\u{0170}`);
console.log(`😰 =>\u{1f630}`);

var buff2=Buffer.from('12', 'hex');  //DC2
console.log(`buff=>${buff2}`);
console.log(`Data received in hex =>${buff2.toString("hex")}`);
console.log(`Data received in ascii =>${buff2.toString("ascii")}`);
console.log("Received %d bytes\n",buff2.length);

if(0x12===buff2[0]){
    console.log(`buff2[0]=${buff2[0]}`);

}

var buff3=Buffer.from('2514', 'hex');  //DC2
console.log(`buff=>${buff3}`);
console.log(`Data received in hex =>${buff3.toString("hex")}`);
console.log(`Data received in ascii =>${buff3.toString("ascii")}`);
console.log("Received %d bytes\n",buff3.length);

if(0x25===buff3[0]){
    console.log(`buff3[0]=${buff3[0]}`);

}


var CNC103Frame = `{{{{{}103,       108`
var data1 = Buffer.from(CNC103Frame);
console.log(`data=>${data1}`);
console.log("Received %d bytes\n",data1.length);
/*
buffer.indexOf(value, start, encoding);
*/
let startChar=data1.indexOf('}', 0);
console.log(`data1.indexOf('}', 0)=>${data1.indexOf('}', 0)}`);
let firstComma = data1.indexOf(',', startChar);
console.log(`data1.indexOf(',', startChar)=>${data1.indexOf(',', startChar)}`);
var id = data1.slice(startChar+1, firstComma);
console.log(`CNC id=>${id}`);
var strId = id.toString();
// var intId = parseInt(strId, 10);
var numId = Number(strId); // returns NaN
if(Number.isNaN(numId)){
    console.log(`strId is NOT a number`);
}else{
    console.log(`strId IS a number`);
}

let endOfFrame = data1.indexOf('%',firstComma);
console.log(`1. endOfFrame=>${endOfFrame}`);

if(-1===endOfFrame){
  endOfFrame = data1.length;
  console.log(`2. endOfFrame=>${endOfFrame}`);
}else{
  console.log(`3. endOfFrame=>${endOfFrame}`);

}
console.log(`4. endOfFrame=>${endOfFrame}`);


var bufPartCounter = data1.slice(firstComma+1, endOfFrame);
var strPartCounter = bufPartCounter.toString().trim();
var numPartCounter = Number(strPartCounter); // returns NaN

if(Number.isNaN(numPartCounter)){
    console.log(`partCounter is NOT a number =>${strPartCounter}`);
}else{
    console.log(`partCounter IS a number=>${strPartCounter}`);
}


