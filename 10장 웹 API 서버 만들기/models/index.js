const Sequelize = require('sequelize');
// DB 접속 정보가 있는 ../config/config.json 에서 어느 환경의 정보를 가져올것인지 명시하기 위해
const env = process.env.NODE_ENV || 'development';  
const config = require('../config/config.json')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Domain = require('./domain');

const db = {};
// DB 접속정보 세팅
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain;

// 모델들의 정보를 sequielize 객체에 리턴해준다
User.init(sequelize); 
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);

module.exports = db;
