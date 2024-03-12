const express = require('express');
const {User, Comment} = require('../models');

const router = express.Router();

// 댓글 추가. /comments, 그리고 POST메소드로 들어왔을 경우 실행
router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter : req.body.id,
            comment : req.body.comment
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
})


router.route('/:id')
    // 댓글 수정. /comments/id, 그리고 PATCH메소드로 들어왔을 경우 실행
    // :id 값으로 들어온 댓글을 수정한다.
    .patch(async (req, res, next) => {
    try {
        const result = await Comment.update({
                comment : req.body.comment
            }, {
                where : {id : req.params.id}
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    // 댓글 삭제. /comments/id, 그리고 DELETE메소드로 들어왔을 경우 실행
    // :id 값으로 들어온 댓글을 삭제한다.
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.destroy({where : {id : req.params.id}});
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;