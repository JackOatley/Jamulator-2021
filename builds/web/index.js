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
	document.title = opts.name ?? document.title;
	canvas.width = opts.resWidth ?? canvas.width;
	canvas.height = opts.resHeight ?? canvas.height;
	canvas.style.width = opts.width ?? canvas.width;
	canvas.style.height = opts.height ?? canvas.height;
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
	for (let n = 0; n < sound.instances.length; n++) {
		if (sound.instances[n].paused) {
			const i = sound.instances[n].play();
			return i;
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
function draw$1(i, x, y, r=0, sx=1, sy=1) {

	// Draw image.
	if (i instanceof Image)
		return target.drawImage(i,
			x - i.ox * sx, y - i.oy * sy,
			i.width * sx, i.height * sy
		);

	// Draw subimage.
	target.drawImage(i.img,
		i.x, i.y, i.w, i.h,
		x - i.ox * sx, y - i.oy * sy,
		i.w * sx, i.h * sy
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
function newSubImage(img, x, y, w, h, ox=0, oy=0) {
	return {
		img: img,
		x: x, y: y,
		w: w, h: h,
		ox: ox, oy: oy
	}
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
function setColor(r, g, b, a=1) {
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
	draw: draw$1,
	line: line,
	newImage: newImage,
	newSubImage: newSubImage,
	points: points,
	print: print,
	rectangle: rectangle,
	setColor: setColor,
	setFont: setFont,
	setTextAlign: setTextAlign,
	setTextBaseline: setTextBaseline
};

const _pressed$1 = {};
const _released$1 = {};
const _down$1 = {};

document.addEventListener("keydown", (e) => {
	if (e.repeat) return;
	_pressed$1[e.code] = true;
	_released$1[e.code] = false;
	_down$1[e.code] = true;
});

document.addEventListener("keyup", (e) => {
	_pressed$1[e.code] = false;
	_released$1[e.code] = true;
	_down$1[e.code] = false;
});

// Returns true if the given key is currently held down.
function down$1(code) {
	return _down$1[code] === true;
}

// Returns true if the given key was pressed in the current tick.
function pressed$1(code) {
	return _pressed$1[code] === true;
}

// Returns true if the given key was released in the current tick.
function released$1(code) {
	return _released$1[code] === true;
}

//
function update$2() {
	for (const key in _down$1) {
		_pressed$1[key] = false;
		_released$1[key] = false;
	}
}

//
var keyboard = {
	down: down$1,
	pressed: pressed$1,
	released: released$1,
	update: update$2
};

//
function choose(...args) {
	return args[~~random(args.length)];
}

//
function distance(x1, y1, x2, y2) {
	const x = x1 - x2, y = y1 - y2;
	return Math.sqrt(x * x + y * y);
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
	distance: distance,
	random: random
};

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
function position() {
	return [x, y];
}

// Returns true if the given button is currently held down.
function down(button) {
	return _down[button] === true;
}

// Returns true if the given button was pressed in the current tick.
function pressed(button) {
	return _pressed[button] === true;
}

// Returns true if the given button was released in the current tick.
function released(button) {
	return _released[button] === true;
}

// Update the mouse states, this is done automatically in engine.js.
function update$1() {
	moveX = 0;
	moveY = 0;
	for (let n = 0; n < 3; n++) {
		_pressed[n] = _released[n] = false;
	}
}

//
var mouse = {
	position: position,
	down: down,
	pressed: pressed,
	released: released,
	update: update$1
};

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
var game = {
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
};

//
class GameObject {

	constructor(img, x=0, y=0) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
	}

	update(dt) {
		this.x += this.vx;
		this.y += this.vy;
		if (this.x < 0 || this.x > 640) this.vx = -this.vx;
		if (this.y < 0 || this.y > 480) this.vy = -this.vy;
	}

	draw() {
		this.img && game.graphics.draw(this.img, this.x, this.y);
	}

}

const sndPlayerMove = game.audio.newSound("audio/playerMove.wav", 2);

//
const playerDog = new GameObject(null, 64, 180-16);

playerDog.moveToX = playerDog.x;
playerDog.moveToY = playerDog.y;
playerDog.nextMove = {};

//
playerDog.update = function() {

	let next = this;

	if (this.moveToX !== this.x || this.moveToY !== this.y) {
		this.x += Math.sign(this.moveToX - this.x);
		this.y += Math.sign(this.moveToY - this.y);
		next = this.nextMove;
		if (game.math.distance(this.x, this.y, this.moveToX, this.moveToY) === 15)
			game.audio.play(sndPlayerMove);
	}

	else {
		if (this.nextMove.moveToX !== undefined
		||  this.nextMove.moveToY !== undefined) {
			this.moveToX = this.nextMove.moveToX ?? this.x;
			this.moveToY = this.nextMove.moveToY ?? this.y;
			this.nextMove = {};
		}
	}

	const nowX = this.moveToX;
	const nowY = this.moveToY;

	if (game.keyboard.pressed("ArrowUp")) {
		next.moveToX = nowX;
		next.moveToY = nowY - 16;
	}

	if (game.keyboard.pressed("ArrowDown")) {
		next.moveToX = nowX;
		next.moveToY = nowY + 16;
	}

	if (game.keyboard.pressed("ArrowLeft")) {
		next.moveToX = nowX - 16;
		next.moveToY = nowY;
	}

	if (game.keyboard.pressed("ArrowRight")) {
		next.moveToX = nowX + 16;
		next.moveToY = nowY;
	}

};

//
playerDog.draw = function() {
	game.graphics.setColor(255, 0, 0);
	game.graphics.rectangle(this.x+2, this.y+2, 12, 12);
};

game.app.setMode({
	name: "Jamulator 2021",
	width: 320 * 4,
	height: 180 * 4,
	resWidth: 320,
	resHeight: 180
});

const tiles = game.graphics.newImage("art/tiles.png");
const grass = game.graphics.newSubImage(tiles, 0, 0, 16, 16);
const grassEdge = game.graphics.newSubImage(tiles, 32, 0, 16, 16);
const road = game.graphics.newSubImage(tiles, 0, 16, 16, 16);
const roadDash = game.graphics.newSubImage(tiles, 16, 16, 16, 16, 8, 0);

const gameObjects = [];

// Generate map.
const order = [grass, road, road, grass, road, road, grass, grass, road, road, grass];
for (let y = 180 - 16, n = 0; y >= 0; y -= 16, n++) {
	for (let x = 0; x < 640; x += 16) {

		if (order[n] === grass && order[n-1] === road)
			gameObjects.push(new GameObject(grassEdge, x, y));

		else
			gameObjects.push(new GameObject(order[n], x, y));

		if (order[n] === road && order[n-1] === road && (x % 32 === 0))
			gameObjects.push(new GameObject(roadDash, x, y + 8));

	}
}

gameObjects.push(playerDog);

game.update((dt) => {
	game.updateList(gameObjects);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	game.drawList(gameObjects);
});
