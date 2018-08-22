let express = require('express');
let login = require('./api1/add.js')
let comment = require('./api1/comment')
let router = express.Router();
    router.post('/register', login.register);
    router.post('/login', login.login);
    router.post('/comment', comment.insertComment);
    router.post('/findComment', comment.find);

module.exports = router;
