var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var connstr = 'mongodb://127.0.0.1:27017/cashier';

var apiresult = require('../modules/apiResult');

var db;
client.connect(connstr, function(_error, _db){
    if(_error){
        console.log(_error);
    } else {
        db = _db;
    }
})

module.exports = {
    select: function(_collection, _condition, _cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    insert : function(_collection, _data, _cb){
        db.collection(_collection).insert(_data, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    update: function(_collection,_item,_data, _cb){
         db.collection(_collection).update(_item,_data, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    delete: function(_collection, _data, _cb){
        db.collection(_collection).remove(_data,function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //改
    Update: function(_collection, arr, _cb){
        console.log(arr);
        //var o = JSON.parse(arr[1]);
        arr[1]._id = arr[0]._id;
        db.collection(_collection).update(arr[0],arr[1],function(error, result){
            console.log(error)
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //查
    search: function(_collection, _condition, _cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error, result){
            if(error){
                _cb({status: false,message: '查找出错！'})
            }else{
                _cb({status: true, data: result, message: '查找成功！'})
            }
            // _cb(apiresult(error ? false : true, error || result));
        })
    }

}