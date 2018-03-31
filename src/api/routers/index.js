var express = require('express');
var app = express();
var bp = require('body-parser');
var io = require('../socket');

var userRouter = require('./user');
var productRouter = require('./product');
var categoryRouter = require('./category')
var uploadRouter = require('./uploda');
var userRouter = require('./user');
var employeeRouter = require('./employee');
var kucunRouter = require('./kucun');
var vipRouter = require('./vip');
var beforeRouter = require('./before');
var path = require('path');

app.use(express.static(path.join(__dirname, '../../web/')));

module.exports = {
    start: function(_port){

        app.use(bp.urlencoded({extended: false}));

        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });

        userRouter.register(app);
        productRouter.register(app);
        categoryRouter.register(app);
        uploadRouter.register(app,express);
        userRouter.register(app);
        employeeRouter.register(app);
        kucunRouter.Register(app);
        vipRouter.register(app);
        beforeRouter.register(app);
        app.listen(_port);
    }
}