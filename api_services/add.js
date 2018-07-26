// let mongodClient = require('../mongod.js');
let express = require('express');
let app =express();
let index = function (req,res,next) {
 console.log(req.path); // /admin
    console.log(req.query);
    console.log(req.body);
   let firstDB = {
       name: '上海黄浦区下午',
       url: 'www.baidu.com'
   };
   
   req.accepts(['json', 'text']);
// mongodClient.insert('user', 'user_info', firstDB);
res.send(firstDB);
    console.log('到此为止');
    // res.end();
    next();

};
module.exports =index;