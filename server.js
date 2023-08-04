const { io } = require(`${__dirname}/app.js`);
const { Room } = require(`${__dirname}/Room.js`);
const { Game } = require(`${__dirname}/Game.js`);

let roomArray = [];
let games = [];

io.on('connection', (socket) => {
    console.log('New person connected');

    socket.on('get rooms', (callback) => {
		callback ({
			"roomArray": roomArray,
		});
    })

	socket.on('room creation', (player, callback) => {
		let room = new Room();
		player.roomId = room.id;
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

				// just an example to how i sent data to a specific player
				// let firstPlayerSocket = roomArray[i].players[0].socketId;
				// io.to(firstPlayerSocket).emit('test', (player));

				let game = new Game(roomArray[i]);
				games.push(game);
				game.startGame();
			}
		}
	})

	socket.on('play', (play, player) => {
		console.log(play);

		let n = 2;
		let game = games[player.roomId - 1];

		if (player.isHost) {
			n = 0;
		} else {
			n = 1;
		}

		let placehold = game.gameGrid[play.row][play.col];

		if ( placehold === 1 || placehold === 0) {
			game.askForPlay();
			return;
		} else {
			game.gameGrid[play.row][play.col] = n
		}
		game.gameLoop();
	})
})	

