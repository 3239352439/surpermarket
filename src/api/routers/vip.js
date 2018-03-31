var db = require('../db/dbhelper');
var jwt = require('jsonwebtoken');
var apiresult = require('../modules/apiresult');
var bp = require('body-parser');
// var path = require('path');
// var express = require('express');
// var app = express();
// app.use(express.static(path.join(__dirname, '../../web/')));

module.exports ={
    register:function(app){
        app.use(bp.json());
        // 解析utf-8
        app.use(bp.urlencoded({extended:false}));

        app.post('/vip',function(req,res){
            var data = req.body;
            // console.log(data);
            db.mongodb.select('vip',data,function(result){
                res.send(result.data);
                // console.log(result.data);
            })
        });
        // 增加
        app.post('/addvip',function(req,res){
            var data = req.body;
            console.log(data)
            db.mongodb.insert('vip',data,function(result){
                res.send({status:true});
            })
        })

        // 删除
        app.post('/delvip',function(req,res){
            var data = req.body;
            console.log(data)
            db.mongodb.delete('vip',data,function(result){
                res.send({status:true});
            })
        })
        // 修改
        app.post('/updatevip',function(req,res){
            var data = req.body;
            console.log(data)
            db.mongodb.update('vip',{_id:data.id},
                {name:data.name,
                tel:data.tel,
                level:data.level,
                points:data.points,
                store:data.store,
                source:data.source},function(result){
                    console.log(result);    
                    res.send({status:true});
            });
        });

        
    }
}
