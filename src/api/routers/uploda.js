var path = require('path');
// var express = require('express');
var fs = require('fs');
var multer = require('multer');//文件上传中间件
var  mongodb = require('mongodb');
var csv = require('node-csv').createParser();//只能识别csv格式后缀名,->引入不同插件的后缀名可以上传不同的？
var lineReader = require('line-reader');//文件逐行读取

//new mongodb.Server(),开启服务的实例,参数:本地地址,默认端口,auto_reconnect:true表示错误时自动连接
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
//定义变量db为数据库名为cashier的数据库,参数('数据库名','开启数据库的客户端',默认参数)
var  db = new mongodb.Db('cashier', server, {safe:true});

module.exports = {
    register:function(app,express){
 
        //中间件 访问静态文件
        app.use(express.static(path.join(__dirname, '/')));

        //自定义名字
        var storage = multer.diskStorage({
            filename: function (req, file, cb) {
                cb(null, file.originalname);  
            }
        });

        //添加配置文件到muler对象
        var upload = multer({ storage: storage })

        // 导入数据库
        app.post('/upload', upload.single('myfile'), function(req, res, next){
            //获取文件路径
            var fileName = req.file.originalname;
            //获取后缀名
            var suffix = req.file.originalname.split('.')[1];
            if(suffix == 'csv'){
               //打开数据库,传入数据库
                db.open(function(err, db){
                    if(!err){
                        console.log('connect successful');
                        //写入goods字段
                        db.createCollection('goods', {safe:true}, function(err, collection){
                            if(err){
                                console.log(err);
                            }else{
                                //读取fileName里面的data,每一条的格式
                                csv.parseFile(fileName, function(err, data) {
                                    if(err){ 
                                        return ; 
                                    }
                                    //输出data,每一个data为1条数据
                                    // console.log(data.length)
                                    for(var i=1;i<data.length;i++){
                                        var id = Number(data[i][0]);
                                        var name =data[i][1]
                                        var Category = data[i][2]
                                        var barCode = data[i][3]
                                        var prdCode = data[i][4]
                                        var prdInPrice = data[i][5]
                                        var price = data[i][6]
                                        var prdVIPPrice = data[i][7]
                                        var inventory = data[i][8]
                                        var prdBZ = data[i][9]
                
                                        //每次循环写入json
                                        var json = {_id:id,name:name,Category:Category,barCode:barCode,prdCode:prdCode,prdInPrice:prdInPrice,price:price,prdVIPPrice:prdVIPPrice,inventory:inventory,prdBZ:prdBZ}
                                        // console.log(json)
                                        // 每一次写入cashier,{safe:true是什么？}
                                        collection.insert(json,{safe:true},function(err,result){
                                            console.log(result);
                                           
                                        }); 
                                    }
                                    
                                });
                            }
                        })
                    }
                });
            } else {
                res.send('数据格式不正确！')
            }
            res.send('导入成功');
            // originalname.split('.')[1]
        });

    }
}
