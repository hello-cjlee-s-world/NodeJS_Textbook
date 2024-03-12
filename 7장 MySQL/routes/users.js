const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

// 사용자 조회. /users, 그리고 GET매소드로 들어왔을 경우 실행
// index.js 에서도 사용자를 조회 했지만 여기서는 json에 담아 보낸다는것이 다름
router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    // 사용자 추가. /users, 그리고 POST메소드로 들어왔을 경우 실행
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                name : req.body.name,
                age : req.body.age,
                married : req.body.married
            });
            console.log(user);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 사용자가 작성한 댓글 불러오기 /users/id/comments, 그리고 GET으로 들어왔을 경우 실행
// :id 에 들어온 값으로 해당 id 가 작성한 댓글을 모두 불러온다
router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include : {
                model : User,
                where : {id : req.params.id}
            }
        });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;