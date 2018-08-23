let MC = require('../mongod.js');
let index = {};


index.uploadAliOss = async function (req, resp) {
   
    try {
        //文档中包含此数据则更新数据
            let data =await MC.findOneAndUpdate('aliOss', 'aliOss', {userId : req.body.userId},req.body);
            console.log(data); 
        if (data) {
            resp.send({
                errcode: 0,
                data: {
                    msg: 1 //写入成功
                }
            })
        } else {
            resp.send({
                errcode: 1,
                data: {
                    msg: 0 // 写入失败
                }
            })
        }
    } catch (e) {

        resp.send({
            errcode: 1,
            data: {
                msg: e // 写入失败
            }
        })
    }
}

index.getAliOss = async (req, resp) => {
    try {
        if (req.body) {
            let find = await MC.findAppoint('aliOss','aliOss',req.body);
            console.log(find);
            resp.send({
                errcode: 0,
                data: {
                    result: find,
                    msg: 1 //写入成功x
                }
            })
        } else {
            resp.send({
                errcode: 1,
                data: {
                    result: '查询失败',
                    msg: 0 //写入失败
                }
            })
        }
    } catch (e) {

        console.log(e);
        resp.send({
            errcode: 500,
            data: {
                msg: '内部错误' // 写入失败
            }
        })
    }
}

module.exports = index;