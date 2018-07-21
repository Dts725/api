let mongodClient = require('../mongod.js');
let index = function (req,res) {
    mongodClient.connect();
    // mongodClient.insert();
    res.send('hello post');
};
module.exports =index;