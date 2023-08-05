import Player from "./Player.js";
import { play, drawGrid, clearCanva } from "./game.js";

export const socket = io();
export let player;

socket.emit('get rooms', (response) => {
	let html = "";
	let roomArray = response.roomArray;
	const roomsList = document.querySelector('#rooms-list');
	const roomsCard = document.querySelector('#rooms-card');

	// console.log(roomArray);

	if(roomArray.length > 0){
		roomArray.forEach(room => {
        if(room.players.length < 2){
			html += `<li>
				     <p>Salon de ${room.players[0].username} - ${room.id}</p>
					 <button class="join-room" data-room="${room.id}">Rejoindre</button>
					 </li>`;
            }
        });
    }
	roomsList.innerHTML = html;
    for(const element of document.getElementsByClassName('join-room')){
		element.addEventListener('click', joinRoom, false);
    }
})

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
}

function joinRoom() {
	let username = document.querySelector('#username').value;
	player = new Player(false, this.dataset.room, username, socket.id);

	socket.emit('join room', (player));
}

socket.on('start game', (board) => {
	const game = document.querySelector("#game");
	const form = document.querySelector("#form");
	const roomsCard = document.querySelector("#rooms-card");

	game.classList.remove("hidden-element");
	form.classList.add("hidden-element");
	roomsCard.classList.add("hidden-element");

	drawGrid(board);	
})

socket.on('ask for play', () => {
	play();
})

socket.on('draw grid', (board) => {
	drawGrid(board);
})

socket.on('game result', (result) => {
	let modal = document.querySelector('#modal');
	let text = document.querySelector('#text');

	if (player.socketId === result.winner) {
		text.innerHTML = "You Win !";
		modal.showModal();
	} else if (result.winner === "tie") {
		text.innerHTML = "Tie !";
		modal.showModal();
	} else {
		text.innerHTML = "You loose !";
		modal.showModal();
	}

	// call rematch
	// save score 
})

socket.on('close pop up', () => {
	let modal = document.querySelector('#modal');

	modal.close();
	clearCanva();
})

document.querySelector('#form').addEventListener('submit',onCreateRoom);
