const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const caseSize = 200;

function drawGrid() {
	ctx.strokeStyle = "#ccc";
	for (let x = 0; x <= 400; x += caseSize) {
		for (let y = 0; y <= 400; y += caseSize) {
			ctx.strokeRect(x, y, caseSize, caseSize);
		}
	}
}


drawGrid();
