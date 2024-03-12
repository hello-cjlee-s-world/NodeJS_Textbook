const express = require('express');
const User = require('../models/user')

const router = express.Router();

// 초기 화면, 사용자 모두 불러와 users 객체에 담아 보내기
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.render('sequelize', { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;