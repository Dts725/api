let MC = require('../mongod.js');
let index = {};

index.uploadAliOss = async (req, resp) => {
    console.log(req)
    console.log(req.body)
    console.log(req.query)
    try {
        let insert = await MC.insert('aliOss', 'aliOss', req.body);

        if (insert) {

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
            let find = await MC.find(req.usrId);
            resp({
                errcode: 0,
                data: {
                    result: find,
                    msg: 1 //写入成功x
                }
            })
        } else {
            resp({
                errcode: 1,
                data: {
                    result: find,
                    msg: 0 //写入失败
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

module.exports = index;