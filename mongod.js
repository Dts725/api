let MongodbClient = require('mongodb').MongoClient;
let url = '47.100.55.117:27017/USER_INFO';
let MongoClient = {};
//连接数据库
MongoClient.connect = function () {

    MongodbClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        let dbase = db.db('USER_INFO');
            dbs.createCollection('user_info',function(err,res) {
                if (err) throw err ;
                console.log('创建集合');
                db.close();
            })
        db.close();
    });
};

//插入单条数据
MongoClient.insert = function () {
    if (err) throw err;
    let dbo = db.db('USER_INFO');
    let firstDB = {name : '上海黄浦区下午',url : 'www.baidu.com'};
        dbo.collection('user_info').insertOne(firstDB,function (err,res) {
            if (err) throw err;
            console.log('文档插入成功');
            db.close();
        });
};

//插入多条数据
MongoClient.insertMany = function () {
    if (err) throw err;
    let dbo = db.db('user_info');
    let obj = [
        {name : '猫', age : '一个月'},
        {name : '旺财', age : '二个月'},
        {name : '佩奇', age : '三个月'},
        {name : '汪汪', age : '四个月个月'},
    ];
    dbo.collection('user_info').insertMany(obj,function (err,res) {
        if (err) throw err;
        console.log('插入文档的数量',res.insertedCount);
        db.close();
    })
}