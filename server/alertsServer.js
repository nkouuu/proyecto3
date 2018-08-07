const User = require("./models/user.model");
const alertsServer = io => {
  console.log("Alerts Server Started!");

  var sockets = [];
  io.on("connection", function(socket) {
    console.log(`a user connected with id ${socket.conn.id}`);

    // Receive the message
    socket.on("id", data => {
      sockets = sockets.filter(e => e.userId != data.id);
      sockets.push({ socket, userId: data.id });
    });
    socket.on("follow", data => {
      //socket.emit("id",{message:"liked"})
      if (sockets.filter(e => e.userId == data.followedId).length > 0) {
        if (
          sockets.filter(e => e.userId == data.followedId)[0].socket.connected
        ) {
          console.log("Notified");
          User.findByIdAndUpdate(
            data.followedId,
            {
              $push: {
                notifications: {
                  notificationType: "follow",
                  userId: data.followerId
                }
              }
            },
            { new: true }
          ).then(user => {});
          socket.broadcast.emit(data.followedId, {
            type: "follow",
            followerId: data.followerId
          });
        }
      }
    });
    socket.on("like", data => {
      //socket.emit("id",{message:"followed"})
      if (sockets.filter(e => e.userId == data.likedId).length > 0) {
        if (sockets.filter(e => e.userId == data.likedId)[0].socket.connected) {
          console.log("Notified");
          User.findByIdAndUpdate(
            data.likedId,
            {
              $push: {
                notifications: {
                  notificationType: "like",
                  userId: data.likerId,
                  recoId:data.recoId

                }
              }
            },
            { new: true }
          ).then(user => {});
          socket.broadcast.emit(data.likedId, {
            type: "like",
            likerId: data.likerId
          });
          socket.broadcast.emit("reloadRecos", {});
        }
      }
    });
    socket.on("reply", data => {
      //socket.emit("id",{message:"followed"})
      if (sockets.filter(e => e.userId == data.repliedId).length > 0) {
        if (
          sockets.filter(e => e.userId == data.repliedId)[0].socket.connected
        ) {
          console.log("Notified");
          User.findByIdAndUpdate(
            data.repliedId,
            {
              $push: {
                notifications: {
                  notificationType: "reply",
                  userId: data.replierId,
                  recoId:data.recoId

                }
              }
            },
            { new: true }
          ).then(user => {
            socket.broadcast.emit(data.repliedId, {
              type: "reply",
              replierId: data.replierId
            });
            socket.broadcast.emit("reloadRecos", {});
          });
        }
      }
    });
    socket.on("newReco", data => {
      User.find({}).then(users => {
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < users[i].following.length; j++) {
            if (users[i].following[j] == data.userId) {
              User.findByIdAndUpdate(
                users[i]._id,
                {
                  $push: {
                    notifications: {
                      notificationType: "newReco",
                      userId: data.userId,
                      recoId:data.recoId
                    }
                  }
                },
                { new: true }
              ).then(user => {
                socket.broadcast.emit(users[i]._id, {
                  type: "newReco",
                  userId: data.userId
                });
              });
            }
          }
        }
      });
      socket.broadcast.emit("reloadRecos", {});
    });
  });
};

module.exports = alertsServer;
