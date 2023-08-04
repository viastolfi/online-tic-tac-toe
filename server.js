const { io } = require(`${__dirname}/app.js`);
const { Room } = require(`${__dirname}/Room.js`);

let roomArray = [];

io.on('connection', (socket) => {
    console.log('New person connected');

    socket.on('get rooms', () => {
        io.to(socket.id).emit('list rooms', roomArray)
    })

	socket.on('room creation', (player) => {
		let room = new Room();
		room.addPlayer(player);

		callback({
			"roomId": room.id,
		});
	})
})	
