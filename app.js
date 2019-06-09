const http = require('http');
const jwtService = require('./service/jwtService');
const socketIo = require('socket.io');
const SocketService = require('./service/SocketService')

// establish the db connection
require('./config/Mongo');

// server configuration
const server = http.createServer();
const io = socketIo(server);

io.on('connection', socket => {

    console.log(`User ${socket.id} has connected`);

    socket.on('authorize', token => {
        jwtService.verifyToken(token).then(username => {
            console.log(`${username} has authenticated....`)
            socket.username = username;
            socket.emit('authorized', { message: 'You are Authorized, now you can make requests' });

            // Here is the business logic:

            // subscribe user to his rooms
            SocketService.subscribe(socket);

            // listen to send message event ----------- data: {roomId: string, content: string }
            socket.on('message', data => SocketService.sendMessage(socket, data));

        }).catch(error => {
            console.error(error)
        });
    });
});

module.exports = server
