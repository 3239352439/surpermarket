var db = require('../db/dbhelper');
var http = require('http');
var url = require('url');

module.exports = {
    register: function(app){
        app.post('/getcategory', function(req, res){
            // var products = req.body.products;
            // console.log(req.body)
            db.mongodb.select('category',req.body,function(result){
                // console.log(result)
                res.send(result.data)
            })
        })
        app.post('/delcategory', function(req, res){
            // var products = req.body.products;
            db.mongodb.delete('category',req.body,function(result){
                // console.log(req.body)
                res.send(result.data)
            })
        })
        app.post('/updatecategory', function(req, res){
            db.mongodb.update('category',{_id:req.body.updateID},{category:req.body.category},function(result){
                res.send(result.data)
            })
        })
        app.post('/insertcategory', function(req, res){
            var products = req.body.products;
            db.mongodb.insert('category',{_id:req.body._id,category:req.body.category},function(result){
                // console.log(result)
                res.send(result.data)
            })
        })

        // app.post('/getcategory', function(req, res){
        //     // var products = req.body.products;
        //     console.log(req.body)
        //     db.mongodb.search('category',{"$or":[{},{"name":"tim"}]},function(result){
        //         // console.log(result)
        //         res.send(result.data)
        //     })
        // })
    }
}