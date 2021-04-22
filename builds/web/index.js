/*
The app module deals with the browser/window, such as; size, positioning, resolution and other rendering settings.
*/

// Set up the main app canvas.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
    e.stopPropagation();
});

// Set various properties of the window.
function setMode(opts) {
	document.title = opts.name || document.title;
	canvas.width = opts.width || canvas.width;
	canvas.height = opts.height || canvas.height;
}

//
var app = {
	canvas: canvas,
	ctx: ctx,
	setMode: setMode
};

// Create a new sound from the given src (url to file). "n" let's us specify how many instances of this sound should be generated, if we need to play multiple of the same sound at once.
function newSound(src, n=1) {

	const instances = [new Audio()];
	instances[0].src = src;

	// Create multiple instances so we can play the same sound multiple times.
	for (; n > 1; n--) {
		instances.push(instances[0].cloneNode());
	}

	return {
		instances: instances
	};

}

// Plays a given sound. The function loops through all instances of the sound to find one that isn't playing, and plays it.
function play(sound) {
	for (let n = 0; n < 11; n++) {
		if (sound.instances[n].paused) {
			return sound.instances[n].play();
		}
	}
	return null;
}

//
var audio = {
	newSound: newSound,
	play: play
};

/*
The grahics module deals with what and how things are drawn to the canvas.
*/

// The current drawning target.
// We use a context for this value as the canvas can be derived from that but not as easily the other way around.
let target = ctx;

// Draw a circle.
function circle(x, y, radius) {
	target.beginPath();
	target.arc(x, y, radius, 0, 2 * Math.PI);
	target.fill();
}

// Clear the canvas to a given color (default opaque black).
function clear(r=0, g=0, b=0, a=1) {
	target.save();
	setColor(r, g, b, a);
	target.fillRect(0, 0, target.canvas.width, target.canvas.height);
	target.restore();
}

//
function draw(i, x, y, r=0, sx=1, sy=1) {
	target.drawImage(i,
		x - i.ox * sx, y - i.oy * sy,
		i.width * sx, i.height * sy
	);
}

// Draw a line from a variable number of coordinates.
// Each point (coord pair) is connected to the previous point.
function line(...c) {
	const len = ~~(c.length / 2) * 2;
	if (len < 4) return;
	target.beginPath();
	target.moveTo(c[0], c[1]);
	for (let n = 2; n < len;)
		target.lineTo(c[n++], c[n++]);
	target.stroke();
}

//
function newImage(url, ox=0, oy=0) {
	const img = new Image();
	img.src = url;
	img.ox = ox;
	img.oy = oy;
	return img;
}

//
function points(...c) {
	const len = ~~(c.length / 2) * 2;
	if (len < 2) return;
	target.beginPath();
	for (let n = 0; n < len;)
		target.rect(c[n++], c[n++], 1, 1);
	target.fill();
}

// Print text at a given position.
function print(text, x, y) {
	target.fillText(text, x, y);
}

//
function rectangle(x, y, w, h) {
	target.beginPath();
	target.rect(x, y, w, h);
	target.fill();
}

// Set the drawing color.
function setColor(r, g, b, a) {
	target.strokeStyle = target.fillStyle = `rgba(${r},${g},${b},${a})`;
}

// Set font from a CSS font shorthand string.
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
function setFont(font) {
	target.font = font;
}

// Set text alignment.
// Can be; "left", "right", "center", "start", "end".
function setTextAlign(x) {
	target.textAlign = x;
}

// Set text baseline.
// Can be; "top", "hanging", "middle", "alphabetic", "ideographic", "bottom".
function setTextBaseline(x) {
	target.textBaseline = x;
}

//
var graphics = {
	circle: circle,
	clear: clear,
	draw: draw,
	line: line,
	newImage: newImage,
	points: points,
	print: print,
	rectangle: rectangle,
	setColor: setColor,
	setFont: setFont,
	setTextAlign: setTextAlign,
	setTextBaseline: setTextBaseline
};

const _pressed = {};
const _released = {};
const _down = {};

document.addEventListener("keydown", (e) => {
	if (e.repeat) return;
	_pressed[e.code] = true;
	_released[e.code] = false;
	_down[e.code] = true;
});

document.addEventListener("keyup", (e) => {
	_pressed[e.code] = false;
	_released[e.code] = true;
	_down[e.code] = false;
});

// Returns true if the given key is currently held down.
function down(code) {
	return _down[code] === true;
}

// Returns true if the given key was pressed in the current tick.
function pressed(code) {
	return _pressed[code] === true;
}

// Returns true if the given key was released in the current tick.
function released(code) {
	return _released[code] === true;
}

//
function update() {
	for (const key in _down) {
		_pressed[key] = false;
		_released[key] = false;
	}
}

//
var keyboard = {
	down: down,
	pressed: pressed,
	released: released,
	update: update
};

//
function choose(...args) {
	return args[~~random(args.length)];
}

//
function random(x, y) {
	switch (arguments.length) {
		case (1): return Math.random() * x;
		case (2): return x + Math.random() * (y - x);
		default: return Math.random();
	}
}

//
var math = {
	choose: choose,
	random: random
};

const _down$1 = new Array(3);
const _pressed$1 = new Array(3);
const _released$1 = new Array(3);

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
	_down$1[e.button] = true;
	_pressed$1[e.button] = true;
	_released$1[e.button] = false;
});

document.body.addEventListener("mouseup", e => {
	_down$1[e.button] = false;
	_pressed$1[e.button] = false;
	_released$1[e.button] = true;
});

// Returns the current position of the mouse.
function position() {
	return [x, y];
}

// Returns true if the given button is currently held down.
function down$1(button) {
	return _down$1[button] === true;
}

// Returns true if the given button was pressed in the current tick.
function pressed$1(button) {
	return _pressed$1[button] === true;
}

// Returns true if the given button was released in the current tick.
function released$1(button) {
	return _released$1[button] === true;
}

// Update the mouse states, this is done automatically in engine.js.
function update$1() {
	moveX = 0;
	moveY = 0;
	for (let n = 0; n < 3; n++) {
		_pressed$1[n] = _released$1[n] = false;
	}
}

//
var mouse = {
	position: position,
	down: down$1,
	pressed: pressed$1,
	released: released$1,
	update: update$1
};

let updateCallback;
let drawCallback;

// Sets the update function.
function update$2(callback) {
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
function draw$1(callback) {
	drawCallback = callback;
}

// Setup main loop.
function mainLoop(time) {
	updateCallback && updateCallback();
	drawCallback && drawCallback();
	keyboard.update();
	mouse.update();
	requestAnimationFrame(mainLoop);
}

// Start main loop.
mainLoop();

//
var game = {
	app: app,
	audio: audio,
	draw: draw$1,
	drawList: drawList,
	graphics: graphics,
	keyboard: keyboard,
	math: math,
	mouse: mouse,
	update: update$2,
	updateList: updateList
};

game.app.setMode({
	name: "Jamulator 2021",
	width: 640,
	height: 480
});

const smiley = game.graphics.newImage("art/smiley.png", 729/2, 729/2);

class Shape {

	constructor(x, y) {
		this.x = x || game.math.random(640);
		this.y = y || game.math.random(480);
		this.vx = game.math.random(-5, 5);
		this.vy = game.math.random(-5, 5);
		this.r = game.math.random(255);
		this.g = game.math.random(255);
		this.b = game.math.random(255);
	}

	update(dt) {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x < 0 || this.x > 640) this.vx = -this.vx;
		if (this.y < 0 || this.y > 480) this.vy = -this.vy;
	}

	draw() {
		game.graphics.setColor(this.r, this.g, this.b, 1);
	}

}

class Circle extends Shape {

	constructor(x, y) {
		super(x, y);
		this.radius = game.math.random(20, 70);
	}

	draw() {
		super.draw();
		game.graphics.circle(this.x, this.y, this.radius);
	}

}

class Rectangle extends Shape {

	constructor(x, y) {
		super(x, y);
		this.size = game.math.random(20, 70);
	}

	draw() {
		super.draw();
		game.graphics.rectangle(this.x, this.y, this.size, this.size);
	}

}

class Smiley extends Shape {

	constructor(x, y) {
		super(x, y);
		this.scale = game.math.random(0.1, 0.2);
	}

	draw() {
		super.draw();
		game.graphics.draw(smiley, this.x, this.y, 0, this.scale, this.scale);
	}

}

const circles = [];

game.update((dt) => {
	if (game.keyboard.pressed("Space")) {
		const c = game.math.choose(Circle, Rectangle, Smiley);
		circles.push(new c(...game.mouse.position()));
	}
	game.updateList(circles);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	game.drawList(circles);
	game.graphics.setColor(255, 255, 255, 1);
	game.graphics.line(...circles.flatMap(i => [i.x, i.y]));
	game.graphics.setTextAlign("center");
	game.graphics.setTextBaseline("middle");
	game.graphics.setFont("italic small-caps bold 64px cursive");
	game.graphics.print("Hello, world!", 320, 240);
});
