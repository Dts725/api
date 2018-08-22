let express = require('express');
let aliOss = require('./zj/upload');
let router = express.Router();
    router.post('/uploadAliOss',aliOss.uploadAliOss);
    router.post('/getAliOss',aliOss.getAliOss);

module.exports = router;