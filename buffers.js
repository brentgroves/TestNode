https://mathiasbynens.be/notes/javascript-escapes
var CNC103Frame = `{{{{}103,10`
var data = Buffer.from(CNC103Frame);

console.log(`data=>${data}`);
console.log(`data.toString()=>${data.toString()}`);
console.log(`smiley=>\uD83D\uDE00`);
console.log(`omega=>\u03A9`);
console.log('😄'.length);
console.log('😄'.charCodeAt());

// console.log(`smiley=>\55357`);
console.log(`a=>\u{000000000061}`);