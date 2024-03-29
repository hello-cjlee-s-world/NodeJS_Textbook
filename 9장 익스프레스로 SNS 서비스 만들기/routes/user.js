const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { addFollowing } = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

module.exports = router;