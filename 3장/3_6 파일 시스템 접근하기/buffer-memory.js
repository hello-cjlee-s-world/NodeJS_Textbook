const fs = require('fs');

console.log('before : ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./3장/big.txt');
fs.writeFileSync('./3장/big2.txt', data1);
console.log('after : ', process.memoryUsage().rss);