import app from "./app.js";
import * as audio from "./audio.js";
import * as graphics from "./graphics.js";
import keyboard from "./keyboard.js";
import math from "./math.js";
import mouse from "./mouse.js";

let updateCallback;
let drawCallback;

// Sets the update function.
export function update(callback) {
	updateCallback = callback;
}

// Sets the draw function.
export function draw(callback) {
	drawCallback = callback;
}

// Executes the update function of an object or for each object in an array.
export function updateList(x) {
	if (x.paused === false) return;
	if (!Array.isArray(x)) return x.update?.();
	x.forEach(updateList);
}

// Executes the draw function of an object or for each object in an array.
export function drawList(x) {
	if (x.visible === false) return;
	if (!Array.isArray(x)) return x.draw?.();
	x.forEach(drawList);
}

// Main loop.
(function mainLoop(time) {
	updateCallback?.();
	drawCallback?.();
	keyboard.update();
	mouse.update();
	requestAnimationFrame(mainLoop);
})();

// Re-export imported modules
export {
	app,
	audio,
	graphics,
	keyboard,
	math,
	mouse
}
