const User = require('../model/User')
const Room = require('../model/Room')
const Message = require('../model/Message')

module.exports = class {

    // subscribe a user to a room events
    // roomId: string
    static subscribe (socket) {
        
        // first find the room
        let { username } = socket;

        User.findOne({username}, (err, user) => {
            if (err) return console.error(err);

            // subscribe to all rooms
            user.rooms.forEach(room => {
                socket.join(room);
            });

	    console.log(username + " has subscribed to his rooms");

        });
    }

    // broadcast a user message to a whole room
    static sendMessage (socket, income) {

	let data;
	
	if (income.content) data = income;
	else data = JSON.parse(income);

	if (data.content == "" || data.content == null) return console.log('Message is missing');

        console.log(socket.username + " sent a new message " + data.content);

        // construct the message
        let message = new Message(socket.username, data.content);

        // save the message
        Room.findByIdAndUpdate(data.roomId, { $push: { messages: message }}, (err, res) => {
            if (err) {
                socket.emit('error', { error: 'Room was not found' });
                return console.error(err);
            }

            socket.broadcast.to(data.roomId).emit('message', {
                from: socket.username,
                content: data.content,
		roomId: data.roomId
            });

        });
    }

}
