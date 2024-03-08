const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./3장/folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then(() => {
        return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
        if(err.code === 'ENOENT'){
            console.log('폴더 없음');
            return fs.mkdir('./3장/folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만들기 성공');
        return fs.open('./3장/folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('빈 파일 만들기 성공', fd);
        return fs.rename('./3장/folder/file.js', './3장/folder/newfile.js');
    })
    .then(() => {
        console.log('이름 바꾸기 성공');
    })
    .catch((err) => {
        console.error(err);
    })
