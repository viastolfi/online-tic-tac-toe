let id = 1;

class Room{
	constructor(){
		this.id = id;
		id += 1;
		this.players = [];
	}
	addPlayer(player) {
		this.players.push(player);
	}
}


module.exports = {
	Room,
}
