let MC = require('../mongod.js');
let index = {};

//评论写入数据库
 index.insertComment = async (req,resp) => {
    let insert = MC.insert('comment','comment',req.body);
     if(insert) {
         resp .send({
             status : 1
         }) 
     } else {
        resp.send({
            status  : 0,
            msg : '数据库写入失败'
        })
     }
};

//获取评论接口
index.find = async (req,resp) => {
    let find = await MC.findAppoint('comment','comment',req.body);
    if (find.length) {
        resp.send({
            status : 1 //获取评论成功
        })
        return false;
    }
}