var jwt = require('jsonwebtoken');
var apiresult = require('../modules/apiresult');
var mongoose = require('mongoose');
var db = require('../db/dbhelper');
module.exports = {
    register: function(app){
        app.post('/loginVerify',function(req, res){
            var token = req.body.token;
            jwt.verify(token,'abc',function(err,decode){
                if (!err){ 
                    res.send('y');
                 }else{
                    res.send('n');
                 }
            })
        });


        app.post('/login',function(req, res){
            
            // 首先根据传过来的用户密码去数据库里面查找
            db.mongodb.select('user', req.body, function(result){
                if(result.status && result.data.length > 0){
                    var token = jwt.sign({username: req.body.username}, 'abc', {
                        expiresIn: 100000
                    })
                    var root = result.data[0].root;
                    res.send(apiresult(true, {token: token,root:root}));
                } else {
                    res.send(apiresult(false, result.data));
                }

            })
        }),
        // 查找
        app.post('/sel',function(req, res){
            db.mongodb.select('user', req.body,function(result){
                var pageNo = Number(req.query.pageNo);
                var qty = Number(req.query.qty);
                var dataArray = result.data.slice((pageNo-1)*qty,pageNo*qty);
                res.send(apiresult(true,{dataArray:dataArray,totle:result.data.length}));
            })
        }),
        // 搜索
        app.post('/ser',function(req, res){
            db.mongodb.select('user', req.body,function(result){
                // var pageNo = Number(req.query.pageNo);
                // var qty = Number(req.query.qty);
                // var dataArray = result.data.slice((pageNo-1)*qty,pageNo*qty);
                // res.send(apiresult(true,{dataArray:dataArray,totle:result.data.length}));
                res.send(apiresult(true,result.data));
            })
        }),

        // 删除
        app.post('/delete',function(req, res){
            // console.log(req.body._id);
            var s = mongoose.Types.ObjectId(req.body._id);
            db.mongodb.delete('user',{_id:s},function(result){
                res.send(apiresult(true,result.data));
            });
        }),

        // 更新
        app.post('/update',function(req, res){
            var data = {
                id_em:req.body.id_em,
                username:req.body.username,
                password:req.body.password,
                root:req.body.root,
                phone:req.body.phone
            };
            var _id = mongoose.Types.ObjectId(req.body._id);
            db.mongodb.update('user',{_id:_id},data,function(result){
                res.send(apiresult(true,result.data));
            });
        }),
        // 插入
        app.post('/insert',function(req, res){
            db.mongodb.insert('user',req.body,function(result){
                res.send(apiresult(true,result.data));
            });
        })
    }
}