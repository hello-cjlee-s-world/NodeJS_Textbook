const fs = require('fs');

fs.readFile('./3장/readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});