export default class Player{
	constructor(isHost, roomId, username, socketId){
		this.isHost = isHost;
		this.roomId = roomId;
		this.username = username;
		this.socketId = socketId;
	}
}
