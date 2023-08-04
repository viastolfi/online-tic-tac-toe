const { io } = require(`${__dirname}/app.js`);
const { Room } = require(`${__dirname}/Room.js`);

let roomArray = [];

io.on('connection', (socket) => {
    console.log('New person connected');

    socket.on('get rooms', (callback) => {
		callback ({
			"roomArray": roomArray,
		});
    })

	socket.on('room creation', (player, callback) => {
		let room = new Room();
		room.addPlayer(player);

		roomArray.push(room);

		callback({
			"roomId": room.id,
		});
	})

	socket.on('join room', (player) => {
		for (let i = 0; i < roomArray.length; i++) {
			if (roomArray[i].id == player.roomId) {
				roomArray[i].addPlayer(player);

				console.log(roomArray[i]);

				let firstPlayerSocket = roomArray[i].players[0].socketId;
				console.log(firstPlayerSocket);

				io.to(firstPlayerSocket).emit('test', (player));
			}
		}
	})
})	
