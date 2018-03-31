/* 
* @Author: Marte
* @Date:   2017-11-25 17:20:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-25 17:30:47
*/
var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/employeeInfo', function(req, res){
            var id_em = req.body.id_em;
            db.mongodb.select('user', {id_em: id_em}, function(result){
                res.send(result);
            })
        })
    }
}