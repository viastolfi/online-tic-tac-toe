import Player from "./Player.js";

const socket = io();

socket.emit('get rooms');
socket.on('list rooms', (roomArray) => {
    console.log(roomArray);
})

let player;

const onCreateRoom = function (event){
    event.preventDefault();

    const form = document.querySelector('#form');
    const username = document.querySelector('#username');

    let usernameValue = username.value;

    player = new Player(true, "", usernameValue, socket.id);

	// sent the creation of the room to the server
	socket.emit('room creation', (player), (response) => {
		player.roomId = response.roomId;
	});

	console.log(player);
}


document.querySelector('#form').addEventListener('submit',onCreateRoom);
