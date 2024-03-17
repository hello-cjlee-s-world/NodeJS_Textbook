const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Hashtag, Post } = require('../models');

const router = express.Router();

// 더 이상 사용할 수 없게 함.
router.use(deprecated);

router.post('/token', async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['nick', 'id']
            }
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요'
            });
        }
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick
        }, process.env.JWT_SECRET, {
            expiresIn: '1m', // 1분
            issuer: 'nodebird' // 발급자
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token
        });
    } catch (error) {
       return res.status(500).json({
        code: 500,
        message: '서버 에러'
       }) ;
    }  
});

// 토큰 테스트
router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
});

router.get('/posts/my', verifyToken, (req, res) => {
    Post.findAll({ where: { userId: req.decoded.id }}) // 토큰에서 아이디 꺼내서 내 아이디로 유저 정보 검색
        .then((posts) => {
            //console.log(posts);
            res.json({
                code: 200,
                payload: posts
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러'
            });
        });
});

router.get('/posts/hashtag/:title', verifyToken, async(req, res) => {
    try {
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        //console.log(hashtag);
        if (!hashtag) {
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다.'
            })
        }
        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });
    }
});


module.exports = router;