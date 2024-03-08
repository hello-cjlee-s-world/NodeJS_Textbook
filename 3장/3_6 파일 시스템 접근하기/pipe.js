const fs = require('fs');

const readStream = fs.createReadStream('./3장/readme4.txt', { highWaterMark : 16 });
const writeStream = fs.createWriteStream('./3장/writeme3.txt');
readStream.pipe(writeStream);

