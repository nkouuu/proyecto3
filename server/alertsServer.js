const alertsServer = (io) => {

    console.log("Alerts Server Started!");

    io.on('connection', function(socket){
        console.log();
        console.log(`a user connected with id ${socket.conn.id}`);
        
        
        // Receive the message
        socket.on('follow', data => {
            console.log(data)
            console.log("Ho!");
            //socket.emit("id",{message:"followed"})
            socket.broadcast.emit(data.followedId,{followerId:data.followerId});
        });

    });

};

module.exports = alertsServer; 