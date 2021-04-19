import app from "./app.js";
import audio from "./audio.js";
import graphics from "./graphics.js";
import math from "./math.js";
import mouse from "./mouse.js";

let updateCallback;
let drawCallback;

// Sets the update function.
function update(callback) {
	updateCallback = callback;
}

// Executes the update function of an object or for each object in an array.
function updateList(x) {
	if (x.paused === false) return;
	if (Array.isArray(x))
		x.forEach(updateList);
	else
		x.update && x.update();
}

// Executes the draw function of an object or for each object in an array.
function drawList(x) {
	if (x.visible === false) return;
	if (Array.isArray(x))
		x.forEach(drawList);
	else
		x.draw && x.draw();
}

// Sets the draw function.
function draw(callback) {
	drawCallback = callback;
}

// Setup main loop.
function mainLoop(time) {
	updateCallback && updateCallback();
	drawCallback && drawCallback();
	mouse.update();
	requestAnimationFrame(mainLoop);
}

// Start main loop.
mainLoop();

//
export default {
	app: app,
	audio: audio,
	draw: draw,
	drawList: drawList,
	graphics: graphics,
	math: math,
	mouse: mouse,
	update: update,
	updateList: updateList
}
