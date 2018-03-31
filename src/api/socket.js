var io = require('socket.io')();

io.on('connection', function(socket){

    socket.on("send", function(msg){
       	console.log(msg)
        io.emit("get" , msg)
        socket.send(msg)
    })
});
io.listen(99)