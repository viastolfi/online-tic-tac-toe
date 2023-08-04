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
		// sent play moove to actual player
		// receive play
		// sent draw grid instruction
		// change actual player
	}

	gameLoop() {
		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('draw grid', (this.gameGrid));

			if (this.actualPlayer !== this.room.players[i].socketId) {
				this.actualPlayer = this.room.players[i].socketId;
			}
		}

		this.askForPlay();
	}

	// TODO 
	// Check winner
	// change player each turn
	// rematch button + score
}

module.exports = {
	Game,
};
