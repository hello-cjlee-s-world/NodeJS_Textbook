const fs = require('fs');

console.log('before : ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./3장/big.txt');
const writeStream = fs.createWriteStream('./3장/big3.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
    console.log('steram : ', process.memoryUsage().rss)
})