const express = require('express');

const router = express.Router();

// GET / 라우터
// router.get('/', (req, res) => {
//     res.send('Hello, Express');
// });

// 템플릿 렌더링
router.get('/', (req, res, next) => {
    res.render('index', { title : 'Express' });
});

module.exports = router;