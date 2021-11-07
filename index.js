const io = require('socket.io')(8900,{
    cors:{
        origin: 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userId , socketId) => {
    if(!users.includes(userId)){
        users.push({userId , socketId});
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);

}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    //when connect
    console.log("User connected");
    //take every connexion id and socket id from user socket
    socket.on('adduser' , userId => {
        addUser( userId , socket.id)
        io.emit("getusers" , users)
    })
    
    //send and reveive message
    socket.on('sendMessage' , ({senderId, receiverId , text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage' , {
            senderId , text
        })
    })

    //disconnected
    socket.on('disconnect' , () => {
        console.log('somebody disconnected')
        removeUser(socket.id)
        io.emit("getusers" , users)
    })
})