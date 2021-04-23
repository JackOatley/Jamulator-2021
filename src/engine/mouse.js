
const _down = new Array(3);
const _pressed = new Array(3);
const _released = new Array(3);

let x = 0;
let y = 0;
let moveX = 0;
let moveY = 0;

document.body.addEventListener("mousemove", e => {
	x = Math.floor(e.clientX);
	y = Math.floor(e.clientY);
	moveX += e.movementX;
	moveY += e.movementY;
});

document.body.addEventListener("mousedown", e => {
	_down[e.button] = true;
	_pressed[e.button] = true;
	_released[e.button] = false;
});

document.body.addEventListener("mouseup", e => {
	_down[e.button] = false;
	_pressed[e.button] = false;
	_released[e.button] = true;
});

// Returns the current position of the mouse.
export function position() {
	return [x, y];
}

// Returns true if the given button is currently held down.
export function down(button) {
	return _down[button] === true;
}

// Returns true if the given button was pressed in the current tick.
export function pressed(button) {
	return _pressed[button] === true;
}

// Returns true if the given button was released in the current tick.
export function released(button) {
	return _released[button] === true;
}

// Update the mouse states, this is done automatically in engine.js.
export function update() {
	moveX = 0;
	moveY = 0;
	for (let n = 0; n < 3; n++) {
		_pressed[n] = _released[n] = false;
	}
}

//
export default {
	position: position,
	down: down,
	pressed: pressed,
	released: released,
	update: update
}
