
let MongodbClient = require('mongodb').MongoClient;
let url = 'mongodb://47.100.55.117:27017/user';
let assert = require('assert');
let MongoClient = {};
let err = function (err) {
    if (err) throw err;
}
//连接数据库
MongoClient.connect = function () {

    MongodbClient.connect(url, function (err, db) {
        assert.equal(null,err);
        console.log('数据库已创建');
        db.close();
    });
};



//插入单条数据
/*
name 文档名
collection : 集合名
obj 插入的数据
*/
MongoClient.insert = function (name,collection,obj) {
      MongodbClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db(name);
 
    dbo.collection(collection).insertOne(obj, function (err, res) {
        if (err) throw err;
        console.log('文档插入成功');
        db.close();
    });
    });
};

//插入多条数据
MongoClient.insertMany = function () {
    if (err) throw err;
    let dbo = db.db('USER_INFO');
    let obj = [{
            name: '猫',
            age: '一个月'
        },
        {
            name: '旺财',
            age: '二个月'
        },
        {
            name: '佩奇',
            age: '三个月'
        },
        {
            name: '汪汪',
            age: '四个月个月'
        },
    ];
    dbo.collection('user_info').insertMany(obj, function (err, res) {
        if (err) throw err;
        console.log('插入文档的数量', res.insertedCount);
        db.close();
    })
};

//查询集合中的所有数据
MongoClient.find = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').find({}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close();
        });
    });
};

//指定查询集合数据
MongoClient.findAppoint = function () {
    MongodbClient.connect('url',function(err,db) {
        if (err) throw err;
        let dbo = db.db('USER_INFO');
        let whereStr = {naem : '旺财'};
        dbo.collection('user_info').find(whereStr).toArray(function (err,res) {
            if (err) throw err;
            console.log(res);
            console.log('指定查询成功');
            db.close();
        });

    });
};

//更新数据
MongoClient.updateOne = function () {
    MongodbClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db('USER_INFO');
        let whereStr = { 'name': '旺财' };
        let updateStr ={$set : { 'url': 'www.qq.com' }};
        dbo.collection('user_info').updateOne(whereStr, updateStr, function (err, res) {
            if (err) throw err;
            console.log(res);
            console.log('数据更新成功');
            db.close();
        });
    });
}

//更新多条数据
MongoClient.updateMany = function () {
    MongodbClient.connect(url ,function(err,db) {
        if(err) throw err;
        let dbo = db.db('USEER_INFO');
        let whereStr = {'name' : '猫'};
        let updateStr = {'name' : '小花','age' : '80岁' };
        dbo.collection('user_info').updateMany(whereStr,updateStr,function(err,res) {
            if (err) throw err;
            console.log(res.result.nModified + '数据更新了') ;
            db.close();
        });
    });
};

// 删除数据     
MongoClient.deleteOne = function () {
    MongodbClient.connect(url,function (err,db) {
      assert.equal(null,err);
        let dbo = db.db('USER_INFO');
        let whereStr = {'name' : '猫'};
        dbo.collection('user-info'.deleteOne(whereStr,function (err,res) {
          assert.equal(null,err);
            console.log(res);
            console.log('数据删除成功');
            db.close();
        }));
    });
};

//删除多条数据
MongoClient.deleteMany = function () {
    MongodbClient.connect(url ,function (err,db) {
      assert.equal(null,err);
        let dbo = db.db('USER_INFO');
        let whereStr = {type : 'en'};
        dbo.collection('user_info').deleteMany(whereStr,function(err,res) {
          assert.equal(null,err);
            console.log(res.result.n + '条文档被删除了');

        });
    });
};

//排序
MongoClient.sort = function (err,db) {
  assert.equal(null,err);
    let dbo = db.db('USER_INFO');
    let mySort = {type : 1};
    dbo.collection('user_info').find().sort(mySort).toArray(function(err,res) {
      assert.equal(null,err);
        console.log(res);
        db.close();
    });
};

//查询分页
MongoClient.limit = function () {
    MongodbClient.connect(url ,function(err,db) {
      assert.equal(null,err);
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').find().limit(2).toArray(function (err, res) {
          assert.equal(null,err);
            console.log(res);
            db.close();
        });
    })
};

//跳过两条查询数据
MongoClient.limitSkip = function () {
    MongodbClient.connect(url,function (err,db) {
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').find().skip(2).limit(2).toArray(function (err,res) {
          assert.equal(null,err);
            console.log(res);
            db.close();
        })
    } );
};

//左链接
MongoClient.lookUp = function () {
    MongodbClient.connect(url ,function (err,db) {
        let dbo =db.db('USER_INFO');
        dbo.collection("user_info").aggregate([
            {
                from: "products",
                localField: "products_id",
                foreignField : '_id',
                as : 'new'
            }
        ],function (err,res) {
          assert.equal(null,err);
            console.log(JSON.stringify(res));
            db.close();
        });
    });
};

//删除集合
MongoClient.deleteCollection = function () {
    MongodbClient.connect(url , function (err,db) {
      assert.equal(null,err);
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').drop(err,function(err,res) {
          assert.equal(null,err);
            if (res) console.log('集合删除成功');
        })
    })
};

//创建集合
MongoClient.createCollection = function (name) {
    MongodbClient.connect(url, function (err, db) {
       assert.equal(null,err);
        let dbo = db.db('user');
        dbo.createCollection(name,function (err,res) {
       assert.equal(null, err);
            console.log('创建集合' + name);
                    db.close();
        })

    })
};
module.exports = MongoClient;