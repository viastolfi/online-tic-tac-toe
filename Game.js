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
		this.rematch = 0;
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
		this.drawGrid();
		for (let i = 0; i < this.room.players.length; i++) {
			if (this.actualPlayer !== this.room.players[i].socketId) {
				nextPlayer = this.room.players[i].socketId;
			}
		}

		this.actualPlayer = nextPlayer;

		this.askForPlay();
	}

	drawGrid() {
		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('draw grid', (this.gameGrid));
		}
}

	checkWin() {
		// check through every rows 
		for (let i = 0; i < this.gameGrid.length; i++) {
			let cube = this.gameGrid[i];
			if (cube[0] === cube[1] && cube[1] === cube[2] && cube[0] !== 2) {
				return {"win": true, "winner": this.actualPlayer};
			}
			if (this.gameGrid[0][i] === this.gameGrid[1][i] && this.gameGrid[1][i] === this.gameGrid[2][i] && this.gameGrid[0][i] !== 2) {
				return {"win": true, "winner": this.actualPlayer};
			}
		};

		if (this.gameGrid[0][0] === this.gameGrid[1][1] && this.gameGrid[1][1] === this.gameGrid[2][2] && this.gameGrid[2][2] !== 2) {
			return {"win":true, "winner": this.actualPlayer};
		}

		if (this.gameGrid[0][2] === this.gameGrid[1][1] && this.gameGrid[1][1] === this.gameGrid[2][0] && this.gameGrid[2][0] !== 2) {
			return {"win":true, "winner": this.actualPlayer};
		}

		if (!checkVal(this.gameGrid, 2)) {
			// case use when there is a tie
			// board is full and there is no clear winner
			return {"win": true, "winner": "tie"};
		}

		return {"win":false, "winner": ""};
	}

	sentResult(result) {
		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('game result', (result));
		}
	}

	restart() {
		this.rematch = 0;
		
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.gameGrid[i][j] = 2;
			}
		}

		for (let i = 0; i < this.room.players.length; i++) {
			io.to(this.room.players[i].socketId).emit('close pop up');
		}

		this.startGame();
	}

	// TODO 
	// rematch button + score
}

function checkVal(array, value) {
    return array.some(function(entry) {
        if (Array.isArray(entry)) {
            return checkVal(entry, value);
        }

        return entry === value;
    });
}

module.exports = {
	Game,
};
