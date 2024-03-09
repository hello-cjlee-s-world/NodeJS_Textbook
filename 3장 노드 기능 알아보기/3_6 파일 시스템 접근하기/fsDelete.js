const fs = require('fs').promises;

fs.readdir('./3장/folder')
    .then((dir) => {
        console.log('폴더 내용 확인 : ', dir);
        return fs.unlink('./3장/folder/newfile.js');
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./3장/folder');
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });