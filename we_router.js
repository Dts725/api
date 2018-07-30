let express = require('express');
let login = require('./api1/add.js')
let router = express.Router();
    router.post('/register', login.register);
    router.post('/login', login.login);

module.exports = router;
