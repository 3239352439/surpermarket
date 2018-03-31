var db = require('../db/dbhelper');
var apiresult = require('../modules/apiresult');
var bp = require('body-parser');

module.exports = {
	register: function(app){
		// 接收json请求
        app.use(bp.json());
        // 解析utf-8
        app.use(bp.urlencoded({ extended: false }));

        app.post('/find', function(req, res){
	        
	         db.mongodb.search('goods', req.body, function(result){
	             if(result.status){
	             	db.mongodb.search('pay',req.body,function(resu){
	             		console.log('pay')
	             		if(resu.data.length>0){
	             			console.log('length')
	             			var num = Number(resu.data[0].qty)+1;
	             			var sum = Number(resu.data[0].price)*num;
	             			db.mongodb.update('pay',req.body,{barCode: resu.data[0].barCode, name: resu.data[0].name, price: resu.data[0].price,qty:num, total: sum},
	             				function(aa){
	             					res.send(apiresult(true,aa.data));
	             				});
	             		}else{
	             			console.log('else')
	             			db.mongodb.search('goods',req.body,function(resul){

	             				console.log(resul)
	             				var sum = Number(resul.data[0].price);
	             				db.mongodb.insert('pay',{barCode: resul.data[0].barCode, name: resul.data[0].name, price: resul.data[0].price,qty: 1, total: sum}, function(re){
	             					res.send(apiresult(true,re.data));
	             				});
	             			})
	             		}
	             	});
	             }else {
	             	res.send(apiresult(false,result.data));
	             }
	        });
        }),

        app.post('/show',function(req, res){
           db.mongodb.search('pay',{},function(result){
                res.send(apiresult(true,result.data));
           });
        }),

        app.post('/clear',function(req, res){
           db.mongodb.delete('pay',{},function(result){
                res.send(apiresult(true,result.data));
           });
        })
	}
}
