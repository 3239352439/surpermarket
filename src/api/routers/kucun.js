var db = require('../db/mongodb.js');
var mongodb = require('mongodb');
var path = require('path');

// var url = require('url');

module.exports = {
    Register: function(app){
        //场景
        app.post('/purchase', function(req, res){
            var params = req.body;
            db.select('repertory',{}, function(result){
               // console.log(result);
                res.send(result);
            });
        })

        app.get('/addpurchase', function(req, res){
         console.log( req.body)
            db.insert('repertory', req.query, function(result){
                res.send(result);
            })
        })
        
        app.post('/updatepurchase',function(req, res){

            db.Update('repertory', [{_id:req.body._id*1},req.body],function(result){
                res.send({status: true});
            })
        })

        app.post('/deletepurchase', function(req, res){
            req.body._id *=1;
            db.delete('repertory', {_id:req.body._id},function(result){
                res.send({status: true});
            })
        })
        //supplier
        app.post('/supplier', function(req, res){
            var params = req.body;
            db.select('supplier',{}, function(result){
               // console.log(result);
                res.send(result);
            });
        })
         app.get('/addSupplier', function(req, res){
            db.insert('supplier', req.query, function(result){
                res.send(result);
            })
        })
         app.post('/updateSupplier',function(req, res){
           
           req.body._id = new mongodb.ObjectID.createFromHexString(req.body._id);
            db.update('supplier', [{_id:req.body._id},req.body],function(result){
                res.send({status: true});
            })
        })

        app.post('/deleteSupplier', function(req, res){
            req.body._id = new mongodb.ObjectID.createFromHexString(req.body._id);
            db.delete('supplier', {_id:req.body._id},function(result){
                res.send({status: true});
            })
        })
    }
}