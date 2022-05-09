const io = require('socket.io')(8000)

const users = {};

io.on('connection',socket=>{
    // if any user join, let other users connected to the server know
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    });

    // if someone send message, broadcast it to other users
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    // if someone left from the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})