const fs = require('fs').promises;

fs.copyFile('./3장/readme4.txt', './3장/writeme4.txt')
    .then(()=>{
        console.log('복사 완료');
    })
    .catch((err) => {
        console.error(err);
    });