const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

import { socket, player } from "./main.js";

const caseSize = 200;

export function drawGrid(gameGrid) {
	ctx.strokeStyle = "#ccc";
	for (let x = 0; x <= 400; x += caseSize) {
		for (let y = 0; y <= 400; y += caseSize) {
			ctx.strokeRect(x, y, caseSize, caseSize);
		}
	}

	for (let i = 0; i < gameGrid.length; i++) {
		let cube = gameGrid[i];
		for (let j = 0; j < cube.length; j++) {
			let data = cube[j];
			if (data === 0) {
				// draw red circle
				ctx.strokeStyle = "#FF0000";

				let x = j * 200 + 100;
				let y = i * 200 + 100;

				ctx.beginPath();
				ctx.arc(x, y, 90, 0, 2 * Math.PI);
				ctx.stroke();
			} else if (data === 1) {
				// draw blue cross	
				ctx.strokeStyle = "#ADD8E6";
				
				let x = j * 200 + 10;
				let y = i * 200 + 10;

				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + 180, y + 180);
				ctx.moveTo(x + 180, y);
				ctx.lineTo(x, y + 180);
				ctx.closePath();
				ctx.stroke();
			}
		}		 
	}
}

function getCursorPosition(canvas, event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	let col = Math.ceil(x / 200) - 1;
	let row = Math.ceil(y / 200) - 1;

	return {"col": col, "row": row};
}

function clickPlay(event) {
	let play = getCursorPosition(canvas, event);

	canvas.removeEventListener('mousedown', clickPlay);

	socket.emit('play', (play), (player));
}

export function play() {
	canvas.addEventListener('mousedown', clickPlay);
}

export function clearCanva() {
	ctx.clearRect(0, 0, 600, 600);
}

const rematch = function(event) {
	event.preventDefault();

	socket.emit('ask for rematch', (player));
	// sent the rematch information to the server
	// While waiting for other player : waiting screen
	// Close the pop up window
	// reset the grid
	// restart the game
}

document.querySelector('#rematch-button').addEventListener('click', rematch);
