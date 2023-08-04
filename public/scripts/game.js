const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const caseSize = 200;
let gameGrid = [3][3];

function drawGrid() {
	ctx.strokeStyle = "#ccc";
	for (let x = 0; x <= 400; x += caseSize) {
		for (let y = 0; y <= 400; y += caseSize) {
			ctx.strokeRect(x, y, caseSize, caseSize);
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

canvas.addEventListener('mousedown', function(e) {
	let play = getCursorPosition(canvas, e);
	console.log(play);
})

drawGrid();
