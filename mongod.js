
let MCD = require('mongodb').MongoClient;
let url = 'mongodb://47.100.55.117:27017/';
let assert = require('assert');
let MC = {};
let err = function (err) {
    if (err) throw err;
}
//连接数据库
MC.connect = function () {

    MCD.connect(url, function (err, db) {
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
// MC.insert = function (name,collection,obj) {
//       MCD.connect(url, {useNewUrlParser: true} , function (err, db) {
//     if (err) throw err;
//     let dbo = db.db(name);
 
//     dbo.collection(collection).insertOne(obj, function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         console.log('文档插入成功');
//         db.close();
//     });
//     });
// };
MC.insert = async function (doc,collection, obj) {
   

   let db = await MCD.connect(url + doc, {
       useNewUrlParser: true
   });
   let dbo = db.db(doc);
   let blogs = await dbo.collection(collection).insert(obj);
   console.log('文档插入成功了')

   db.close();
   return blogs;
};

//插入多条数据
MC.insertMany = function () {
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
MC.find = function () {
    MC.connect(url, function (err, db) {
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
// MC.findAppoint = function () {
//     MCD.connect('url',function(err,db) {
//         if (err) throw err;
//         let dbo = db.db('USER_INFO');
//         let whereStr = {naem : '旺财'};
//         dbo.collection('user_info').find(whereStr).toArray(function (err,res) {
//             if (err) throw err;
//             console.log(res);
//             console.log('指定查询成功');
//             db.close();
//         });

//     });
// };
MC.findAppoint = async function (doc,collection,obj) {
    let db = await MCD.connect(url + doc, {
        useNewUrlParser: true
    });
    let dbo = db.db(collection);
    let blogs = await dbo.collection(collection).find(obj).toArray();

    return blogs;
    db.close();

    

};

//更新数据
MC.updateOne = function () {
    MCD.connect(url, function (err, db) {
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
MC.updateMany = function () {
    MCD.connect(url ,function(err,db) {
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
MC.deleteOne = function () {
    MCD.connect(url,function (err,db) {
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
MC.deleteMany = function () {
    MCD.connect(url ,function (err,db) {
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
MC.sort = function (err,db) {
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
MC.limit = function () {
    MCD.connect(url ,function(err,db) {
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
MC.limitSkip = function () {
    MCD.connect(url,function (err,db) {
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').find().skip(2).limit(2).toArray(function (err,res) {
          assert.equal(null,err);
            console.log(res);
            db.close();
        })
    } );
};

//左链接
MC.lookUp = function () {
    MCD.connect(url ,function (err,db) {
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
MC.deleteCollection = function () {
    MCD.connect(url , function (err,db) {
      assert.equal(null,err);
        let dbo = db.db('USER_INFO');
        dbo.collection('user_info').drop(err,function(err,res) {
          assert.equal(null,err);
            if (res) console.log('集合删除成功');
        })
    })
};

//创建集合
MC.createCollection = function (name) {
    MCD.connect(url, function (err, db) {
       assert.equal(null,err);
        let dbo = db.db('user');
        dbo.createCollection(name,function (err,res) {
       assert.equal(null, err);
            console.log('创建集合' + name);
                    db.close();
        })

    })
};
module.exports = MC;