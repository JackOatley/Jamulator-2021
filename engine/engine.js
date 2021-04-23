import app from "./app.js";
import audio from "./audio.js";
import graphics from "./graphics.js";
import keyboard from "./keyboard.js";
import math from "./math.js";
import mouse from "./mouse.js";

let updateCallback;
let drawCallback;

// Sets the update function.
function update(callback) {
	updateCallback = callback;
}

// Sets the draw function.
function draw(callback) {
	drawCallback = callback;
}

// Executes the update function of an object or for each object in an array.
function updateList(x) {
	if (x.paused === false) return;
	if (!Array.isArray(x)) return x.update && x.update();
	x.forEach(updateList);
}

// Executes the draw function of an object or for each object in an array.
function drawList(x) {
	if (x.visible === false) return;
	if (!Array.isArray(x)) return x.draw && x.draw();
	x.forEach(drawList);
}

// Main loop.
(function mainLoop(time) {
	updateCallback && updateCallback();
	drawCallback && drawCallback();
	keyboard.update();
	mouse.update();
	requestAnimationFrame(mainLoop);
})();

//
export default {
	app: app,
	audio: audio,
	draw: draw,
	drawList: drawList,
	graphics: graphics,
	keyboard: keyboard,
	math: math,
	mouse: mouse,
	update: update,
	updateList: updateList
}
