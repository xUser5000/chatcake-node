const http = require('http');
const jwtService = require('./service/jwtService');
const socketIo = require('socket.io');

// establish the db connection
require('./config/Mongo');

const server = http.createServer((req, res) => {
    res.end("Hello World");
});

const io = socketIo(server);

io.on('connection', socket => {

    console.log(`User ${socket.id} has connected`);

    socket.on('authorize', data => {
        jwtService.verifyToken(data.token).then(() => {
            
            socket.emit('authorized');

        }).catch(error => socket.emit('error', { error }));
    });
});

module.exports = server