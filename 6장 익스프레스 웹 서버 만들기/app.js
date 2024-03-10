const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // .env 형식의 파일을 읽어서 process.env로 만듬
const app = express();
app.set('port', process.env.PORT || 8080);
// app.use(morgan('combined')); // dev, combined, common, short, tiny 등을 인수로 넣을 수 있음, loglevel하고 비슷한 느낌
// app.use('/', express.static(path.join(__dirname, 'public'))); // express.static 은 정적인 파일을 제공하는 라우터 역할을 함
// app.use(express.json());                        // JSON과 URI-encoded형식의 데이터를 해석할 수 있음..
// app.use(express.urlencoded({ extended:false }));// false라면 노드의 querystring 모듈을 사용하여 쿼리 스트링을 해석, true면 qs 모듈을 사용
// app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    morgan('combined'), // dev, combined, common, short, tiny 등을 인수로 넣을 수 있음, loglevel하고 비슷한 느낌
    express.static(path.join(__dirname, 'public')), // express.static 은 정적인 파일을 제공하는 라우터 역할을 함
    express.json(),                          // JSON과 URI-encoded형식의 데이터를 해석할 수 있음..
    express.urlencoded({ extended:false }),  // false라면 노드의 querystring 모듈을 사용하여 쿼리 스트링을 해석, true면 qs 모듈을 사용
    cookieParser(process.env.COOKIE_SECRET)  // req에 동봉된 쿠키를 해석해 req.cookies 객체로 만듬
);

app.use(session({
    resave : false,
    saveUninitailized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
    name : 'session-cookie'
}));

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
} catch(err) {
    console.error('uploads 폴더가 없으므로 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname + ext) + Date.now() + ext);
        }
    }),
    limits : { fileSize : 5 * 1024 * 1024}
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload',
        upload.fields([{ name : 'image1' }, { name : 'image2' }]), 
        (req, res) => {
            console.log(req.files, req.body);
            res.send('ok');
        });

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다');
    next();
})

app.get('/', (req, res, next) =>  {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// app.get('/', (req, res) => {
//     //res.send('Hello, Express');
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});