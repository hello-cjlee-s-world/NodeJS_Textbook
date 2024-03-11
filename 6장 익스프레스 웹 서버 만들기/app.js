const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config(); // .env 형식의 파일을 읽어서 process.env로 만듬
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 8080);
//app.set('views', path.join(__dirname, 'views')); // 템플릿 파일이 위치한 경로(pug)
//app.set('view engine', 'pug'); // 어떤 종류의 템플릿 엔진을 사용할것인지(pug)
app.set('view engine', 'html'); // 어떤 종류의 템플릿 엔진을 사용할것인지

nunjucks.configure('views', { // 템플릿 파일이 위치한 경로(nunjucks)
    express : app,
    watch : true
})

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

app.use(session({  // 세션 쿠키 설정 부분
    resave : false,
    saveUninitailized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
    name : 'session-cookie'
}));

// routes 경로의 index, user 임포트 부분
app.use('/', indexRouter);
app.use('/user', userRouter);

// 404 처리 미들웨어
app.use((req, res, next) => {
    //res.status(404).send('Not Found');
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status=404;
    next(error);
})

// 파일 업로드를 위한 multer 설정 부분
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


// Express 기초 부분
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
    res.locals.message = err.message;
    // err 객체의 스택 트레이스(error.html의 error.stack)는 시스템 환경(process.env.NODE_ENV)이
    // production(배포 환경)이 아닌 경우에만 표시되도록
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// app.get('/', (req, res) => {
//     //res.send('Hello, Express');
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});