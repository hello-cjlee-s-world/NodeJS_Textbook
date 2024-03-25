const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../models/room');
const Chat = require('../models/chat');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const rooms = await Room.findAll({});
        res.render('main', {rooms, title: 'GIF 채팅방'});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/room', (req, res) => {
    res.render('room', {title: 'GIF 채팅방 생성'});
});

router.post('/room', async (req, res, next) => {
    try {
        const newRoom = await Room.create({
            title: req.body.title,
            max: req.body.max,
            owner: req.session.color,
            password: req.body.password
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
        res.redirect(`/room/${newRoom.rid}?password=${req.body.password}`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/room/:id', async (req, res, next) => {
    try {
        const room = await Room.findOne({ where: { rid: req.params.id }});
        const io = req.app.get('io');
        if(!room) {
            return res.redirect('/?error=존재하지 않는 방입니다.');
        } 
        if(room.password && room.password !== req.query.password) {
            return res.redirect('/?error=비밀번호가 틀렸습니다.')
        }
        const { rooms } = io.of('/chat').adapter;
        if(rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length) {
            return res.redirect('/?error=허용 인원을 초과했습니다.')
        }
        const chats = (await Chat.findAll({ 
           where: { 'rid': room.rid },
           order: [['created_at', 'ASC']]
        }));
        return res.render('chat', {
            room,
            title: room.title,
            chats,
            user: req.session.color
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.delete('/room/:id', async (req, res, next) => {
    try {
        console.log('testset: ',req.params.id);
        await Room.destroy({ where : { rid: req.params.id }});
        await Chat.destroy({ where : { rid: req.params.id }});
        res.send('of');
        setTimeout(() => {
            req.app.get('io').of('/room').emit('removeRoom', req.params.id);
        }, 2000);
    } catch (error) {
        console.error(error);
        return next(error);
    }
} );

router.post('/room/:id/chat', async (req, res, next) => {
    try {
        const chat = await Chat.create({
            rid : req.params.id,
            user: req.session.color,
            chat: req.body.chat
        });
        console.log(chat);
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// 파일 업로드 관련
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 존재하지 않아 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
} 

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 500 * 1024 * 1024 }
});

router.post('/room/:id/gif', upload.single('gif'), async (req, res, next) => {
    try {
        const chat = await Chat.create({
            rid : req.params.id,
            user: req.session.color,
            gif: req.file.filename
        });
        console.log(chat);
        req.app.get('io').of('chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;