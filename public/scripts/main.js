import Player from "./Player.js";

const socket = io();
let player;

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

socket.on('test', (player) => {
	console.log(player);
})

document.querySelector('#form').addEventListener('submit',onCreateRoom);
