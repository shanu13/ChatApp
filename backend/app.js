
const io = require('socket.io')(8000,{
    cors : {
        origin: "http://127.0.0.1:5500",
    }
})
   

const users = {};
io.on('connection', (socket)=> {
    
    socket.on('new-user-joined',name => {
        // console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    });

    socket.on('send' , message => {
        // console.log('sending...')
        socket.broadcast.emit('recieve', {message : message, name : users[socket.id]});
    })

    socket.on('disconnect',message => {
        socket.broadcast.emit('left',{name : users[socket.id]})
        delete users[socket.id];
    })

});