const fs = require('fs').promises;

fs.writeFile('./3장/writeme.txt', '글이 입력됩니다.')
    .then(()=>{
        return fs.readFile('./writeme.txt');
    })
    .then(data => {
        console.log(data);
        console.log(data.toString());
    })
    .catch(error => {
        console.error(error);
    });