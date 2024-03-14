const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    // 사용자 정보 객체를 세션에 아이디로 저장
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            inclulde: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'followers'
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Follwings'
            }]
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    })
    local();
    kakao();
};