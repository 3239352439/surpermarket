var db = require('../db/dbhelper');
var http = require('http');
var url = require('url');
$pageNo = 1;
$qty =10;
module.exports = {
    register: function(app){
        app.post('/getproduct', function(req, res){
            // var products = req.body.products;
            console.log(req.body)
            db.mongodb.select('goods',req.body,function(result){
                // console.log(result.data.length)
                // var aa = Array(
                //     'data':split(result.data,(pageNo-1)*qty),qty),
                //     'total':count(result.data)
                //     );
                // console.log(aa)

                res.send(result.data)
            })
        })
        app.post('/delproduct', function(req, res){
            // console.log( req.body);
            db.mongodb.delete('goods',req.body,function(result){
                // console.log(req.body)
                res.send(result.data)
            })
        })
        app.post('/updateproduct', function(req, res){
            // var products = req.body.data;
            // var ID =  req.body.updateID;
            // console.log({_id:req.body.updateID})
            // console.log(req.body.list2)
            // console.log(req.body.name)
            db.mongodb.update('goods',{_id:req.body.updateID},{
                name:req.body.name,
                Category:req.body.Category,
                barCode:req.body.barCode,
                prdCode:req.body.prdCode,
                prdInPrice:req.body.prdInPrice,
                price:req.body.price,
                prdVIPPrice:req.body.prdVIPPrice,
                inventory:req.body.inventory,
                prdBZ:req.body.prdBZ
               },function(result){
                // console.log(result)
                res.send(result.data)
            })
        })
       

        app.post('/insertproduct', function(req, res){
        
            db.mongodb.insert('goods',req.body,function(result){
                // console.log(result)
                res.send(result.data)
            })
        })
    }
}