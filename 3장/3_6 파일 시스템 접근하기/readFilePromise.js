const fs = require('fs').promises;

fs.readFile('./3장/readme.txt')
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch(error => {
        console.error(error);
    });