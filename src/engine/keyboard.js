
const _pressed = {};
const _released = {};
const _down = {};

document.addEventListener("keydown", (e) => {
	if (e.repeat) return;
	_pressed[e.code] = true;
	_released[e.code] = false;
	_down[e.code] = true;
	e.preventDefault();
});

document.addEventListener("keyup", (e) => {
	_pressed[e.code] = false;
	_released[e.code] = true;
	_down[e.code] = false;
	e.preventDefault();
});

// Returns true if the given key is currently held down.
export function down(code) {
	return _down[code] === true;
}

// Returns true if the given key was pressed in the current tick.
export function pressed(code) {
	return _pressed[code] === true;
}

// Returns true if the given key was released in the current tick.
export function released(code) {
	return _released[code] === true;
}

//
export function update() {
	for (const key in _down) {
		_pressed[key] = false;
		_released[key] = false;
	}
}

//
export default {
	down: down,
	pressed: pressed,
	released: released,
	update: update
}
