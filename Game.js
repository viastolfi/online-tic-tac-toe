const { io } = require(`${__dirname}/app.js`);

class Game {
	constructor(room) {
		this.room = room;
		this.gameGrid = [
						[2, 2, 2],
						[2, 2, 2],
						[2, 2, 2],
						];
		this.actualPlayer = "";
	}

	startGame() {
		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('start game', (this.gameGrid));	
		}
		
		this.actualPlayer = this.room.players[0].socketId;
		this.askForPlay();
	}

	askForPlay() {
		io.to(this.actualPlayer).emit('ask for play');
	}

	gameLoop() {
		let nextPlayer;
		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('draw grid', (this.gameGrid));

			if (this.actualPlayer !== this.room.players[i].socketId) {
				nextPlayer = this.room.players[i].socketId;
			}
		}

		this.actualPlayer = nextPlayer;

		this.askForPlay();
	}

	// TODO 
	// Check winner
	// rematch button + score
}

module.exports = {
	Game,
};
