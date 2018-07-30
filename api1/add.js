let MC = require('../mongod.js');
let index = {};
//页面注册接口
index.register = async function (req, resp, next) {
    console.log(req.body)
    //查是否已注册
    console.time('start')
    let find = await MC.findAppoint('user_info', 'user_info', req.body);
    console.log(find);
    if (!find.length) {
        let insert = await MC.insert('user_info', 'user_info', req.body);
        resp.send({
            msg: '注册成功' //注册成功
        })
        return false
    }
    console.timeEnd('start');


    resp.send({
        msg: '用户名已注册请重新注册'
    });
};

//登陆接口
index.login = async function (req, resp, next) {
    let find = await MC.findAppoint('user_info', 'user_info', req.body);
    if (find.length) {
        resp.send({
            msg: '用户密码成功',
            status: '1'
        })
        return false;
    };
    resp.send({
        status: '0',
        msg: '用户名或密码错误'
    })
};
module.exports = index;