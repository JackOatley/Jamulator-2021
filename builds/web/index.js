/*
The app module deals with the browser/window, such as; size, positioning, resolution and other rendering settings.
*/

// Set up the main app canvas.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//
let fullscreen = false;

//
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
    e.stopPropagation();
});

// Set various properties of the window.
function setMode(opts = {}) {
	document.title = opts.name ?? document.title;
	canvas.width = opts.resWidth ?? canvas.width;
	canvas.height = opts.resHeight ?? canvas.height;
	canvas.style.width = opts.width ?? canvas.width;
	canvas.style.height = opts.height ?? canvas.height;
	ctx.imageSmoothingEnabled = false;
	fullscreen = opts.fullscreen ?? false;
	if (fullscreen) handleResize();
}

//
function handleResize() {
	if (!fullscreen) return;
	const scale = Math.min(
		window.innerWidth / canvas.width,
		window.innerHeight / canvas.height
	);
	canvas.style.width = canvas.width * scale;
	canvas.style.height = canvas.height * scale;
}

//
window.addEventListener('resize', handleResize);

//
var app = {
	canvas: canvas,
	ctx: ctx,
	setMode: setMode
};

//
const choose = (...args) => args[~~random(args.length)];

//
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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
	clamp: clamp,
	distance: distance,
	random: random
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
	if (Array.isArray(sound)) return play(choose(...sound));
	for (let n = 0; n < sound.instances.length; n++) {
		if (sound.instances[n].paused) {
			return sound.instances[n].play();
		}
	}
	return null;
}

//
function loop(sound) {
	if (sound.instances[0].paused) {
		sound.instances[0].loop = true;
		return sound.instances[0].play();
	}
}

//
function isPlaying(sound) {
	return !sound.instances[0].paused;
}

//
var audio = {
	newSound: newSound,
	play: play,
	loop: loop,
	isPlaying: isPlaying
};

/*
The grahics module deals with what and how things are drawn to the canvas.
*/

// The current drawning target.
// We use a context for this value as the canvas can be derived from that but not as easily the other way around.
let target = ctx;

// Clear the canvas to a given color (default opaque black).
function clear(r=0, g=0, b=0, a=1) {
	target.save();
	setColor(r, g, b, a);
	target.fillRect(0, 0, target.canvas.width, target.canvas.height);
	target.restore();
}

// Draw an image, or sub-image (Object) at given position, rotation and scaling.
function draw$1(i, x=0, y=0, r=0, sx=1, sy=1) {
	push();
	translate(x - i.ox, y - i.oy);
	scale(sx, sy);
	if (i instanceof Image) return target.drawImage(i, x, y, i.w, i.h);
	target.drawImage(i.img, i.x, i.y, i.w, i.h, 0, 0, i.w, i.h);
	pop();
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

// Set the drawing color.
function setColor(r, g, b, a=1) {
	target.strokeStyle = target.fillStyle = `rgba(${r},${g},${b},${a})`;
}

//------------------------------------------------------------------------------
// Text.
//------------------------------------------------------------------------------

// Print text at a given position.
const print = (text, x, y) => target.fillText(text, x, y);

// Set font from a CSS font shorthand string.
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
const setFont = (font) => target.font = font;

// Set text alignment.
// Can be; "left", "right", "center", "start", "end".
const setTextAlign = (x) => target.textAlign = x;

// Set text baseline.
// Can be; "top", "hanging", "middle", "alphabetic", "ideographic", "bottom".
const setTextBaseline = (x) => target.textBaseline = x;

//------------------------------------------------------------------------------
// Transomation.
//------------------------------------------------------------------------------

//
const push = () => target.save();

//
const pop = () => target.restore();

//
const translate = (x, y) => target.translate(x, y);

//
const scale = (x, y) => target.scale(x, y);

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
	if (!Array.isArray(x)) return x.update?.();
	x.forEach(updateList);
}

// Executes the draw function of an object or for each object in an array.
function drawList(x) {
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

//
class GameObject {

	constructor(img, x=0, y=0, depth=0) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.depth = depth;
	}

	update(dt) {
		this.x += this.vx;
		this.y += this.vy;
	}

	draw() {
		this.img && draw$1(this.img, this.x, this.y, 0, this.scaleX, this.scaleY);
	}

}

const gameObjects = [];

const global = {
	level: 0,
	gameObjects: gameObjects
};

// Sound assets.
const sndMusic1 = audio.newSound("audio/music1.wav");
const sndAmbienceCars = audio.newSound("audio/sfx_ambience_cars_ogg.oga");
const sndPlayerWalkGrass = [
	audio.newSound("audio/sfx_footstep_grass_1.wav", 2),
	audio.newSound("audio/sfx_footstep_grass_2.wav", 2),
	audio.newSound("audio/sfx_footstep_grass_3.wav", 2)];
const sndPlayerWalkAlsphalt = [
	audio.newSound("audio/sfx_footstep_alsphalt_1.wav", 2),
	audio.newSound("audio/sfx_footstep_alsphalt_2.wav", 2),
	audio.newSound("audio/sfx_footstep_alsphalt_3.wav", 2)];
audio.newSound("audio/sfx_dog_being_petted.wav");
const sndDogWhimpering = [
	audio.newSound("audio/sfx_dog_whimpering_1.wav", 2),
	audio.newSound("audio/sfx_dog_whimpering_2.wav", 2),
	audio.newSound("audio/sfx_dog_whimpering_3.wav", 2)];
const sndObjectiveGet = audio.newSound("audio/sfx_dog_eating.wav");
const sndCompleteLevel = audio.newSound("audio/completeLevel.wav");

// Art assets.
const tiles = newImage("art/tiles.png");
const sprTitle = newSubImage(tiles, 0, 192, 256, 64, 128, 32);
const sprPlayerDog = newSubImage(tiles, 48, 32, 16, 16, 0, 4);
const sprPlayerHuman = newSubImage(tiles, 32, 16, 16, 32, 0, 20);
const sprUnitShadow = newSubImage(tiles, 48, 16, 16, 16, 0, 2);
const grass = [
	newSubImage(tiles, 0, 0, 16, 16),
	newSubImage(tiles, 48, 0, 16, 16)];
const grassEdge = [
	newSubImage(tiles, 32, 0, 16, 16),
	newSubImage(tiles, 80, 0, 16, 16)];
const road = newSubImage(tiles, 0, 16, 16, 16);
const roadDash = newSubImage(tiles, 16, 16, 16, 16, 8, 0);
const rock = [
	newSubImage(tiles, 48, 48, 16, 16, 0, 0)];
const tree = [
	newSubImage(tiles, 0, 32, 16, 32, 0, 18),
	newSubImage(tiles, 16, 32, 16, 32, 0, 18),
	newSubImage(tiles, 32, 48, 16, 16, 0, 2)];
const treeShadow = [
	newSubImage(tiles, 0, 64, 20, 8, -8, -7),
	newSubImage(tiles, 0, 64, 15, 8, -8, -7),
	newSubImage(tiles, 0, 64, 10, 8, -8, -7)];
const car = [
	newSubImage(tiles, 0, 72, 32, 16, 0, 4),
	newSubImage(tiles, 32, 72, 32, 16, 0, 4),
	newSubImage(tiles, 64, 72, 32, 16, 0, 4),
	newSubImage(tiles, 96, 72, 32, 16, 0, 4)];
const carShadow = newSubImage(tiles, 0, 88, 32, 16, 0, 4);

const bone = newSubImage(tiles, 112, 0, 16, 16);
const flag = newSubImage(tiles, 112, 16, 16, 16);

//
const playerPerson = new GameObject(sprPlayerHuman, 64-16, 180-16);

playerPerson.isHit = false;
playerPerson.startX = 0;
playerPerson.startY = 0;
playerPerson.w = 12;
playerPerson.h = 12;
playerPerson.depth = 10;
playerPerson.moveToX = playerPerson.x;
playerPerson.moveToY = playerPerson.y;
playerPerson.nextMove = {};

//
playerPerson.update = function() {

	if (playerDog.isHit) {
		const xd = Math.min(2, math.distance(this.x, 0, this.startX, 0));
		const yd = Math.min(2, math.distance(0, this.y, 0, this.startY));
		this.x += Math.sign(this.moveToX - this.x) * xd;
		this.y += Math.sign(this.moveToY - this.y) * yd;
		if (this.x === this.startX && this.y === this.startY) {
			this.isHit = false;
		}
		return;
	}

	this.x += Math.sign(this.moveToX - this.x);
	this.y += Math.sign(this.moveToY - this.y);

};

//
playerPerson.draw = function() {
	draw$1(sprUnitShadow, this.x, this.y);
	draw$1(sprPlayerHuman, this.x, this.y);
};

// 0 = grass
// 1 = trees
const D = -1000;	// Dog
const P = -1001;	// Person
const T = -1002;	// Tree
const X = -1003;	// Objective/target
const F = -1004;	// Finish (once you get objective)

const maps = [

	{
		name: "Single Lane",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,X,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,T,0,0,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Test Level",
		desc: "Cross the roads, don't get petted, don't let hooman down!",
		data: [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,X,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,T,0,T,0,T,0,T,0,T,0,T,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,T,0,0,T,0,0,0,P,D,0,0,0,0,0,0,0,0,0],
			[0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		]
	}, {
		name: "Test Level 2",
		desc: "Blah-de-blah!",
		data: [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,X,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,T,0,T,0,T,0,T,0,T,0,T,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,T,0,0,T,0,0,0,P,D,0,0,0,0,0,0,0,0,0],
			[0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		]
	}

];

//
const mapGet = (map, x, y) => maps[map].data[y]?.[x];

//
const playerDog = new GameObject(sprPlayerDog, 64, 180-16);

playerDog.isHit = false;
playerDog.startX = 0;
playerDog.startY = 0;
playerDog.w = 12;
playerDog.h = 12;
playerDog.depth = 10;
playerDog.moveToX = playerDog.x;
playerDog.moveToY = playerDog.y;
playerDog.nextMove = {};
playerDog.moving = false;

//
playerDog.hit = function() {
	if (!playerDog.isHit) {
		playerDog.isHit = playerDog.isHit = true;
		playerDog.moveToX = playerDog.startX;
		playerDog.moveToY = playerDog.startY;
		playerPerson.moveToX = playerPerson.startX;
		playerPerson.moveToY = playerPerson.startY;
		audio.play(sndDogWhimpering);
	}
};

//
playerDog.update = function() {

	if (playerDog.isHit) {
		const xd = Math.min(2, math.distance(this.x, 0, this.startX, 0));
		const yd = Math.min(2, math.distance(0, this.y, 0, this.startY));
		this.x += Math.sign(this.moveToX - this.x) * xd;
		this.y += Math.sign(this.moveToY - this.y) * yd;
		this.isHit = (this.x !== this.startX && this.y !== this.startY);
		return;
	}

	let next = this;

	// Fix potential diagonal movement.
	if (this.moveToX !== this.x && this.moveToY !== this.y) {
		this.moveToY = this.y;
	}

	if (this.moveToX !== this.x || this.moveToY !== this.y) {
		if (!this.moving) {
			this.moving = true;
			if (mapGet(global.level, this.x / 16, this.y / 16) === 1)
				audio.play(sndPlayerWalkAlsphalt);
			else
				audio.play(sndPlayerWalkGrass);
			playerPerson.moveToX = this.x;
			playerPerson.moveToY = this.y;
		}
		this.x += Math.sign(this.moveToX - this.x);
		this.y += Math.sign(this.moveToY - this.y);
		next = this.nextMove;
	}

	if (this.moveToX === this.x && this.moveToY === this.y) {
		this.moving = false;
		if (this.nextMove.moveToX !== undefined
		||  this.nextMove.moveToY !== undefined) {
			this.moveToX = this.nextMove.moveToX ?? this.x;
			this.moveToY = this.nextMove.moveToY ?? this.y;
			this.nextMove = {};
		}
	}

	//
	let dx = -keyboard.pressed("ArrowLeft") + keyboard.pressed("ArrowRight");
	let dy = -keyboard.pressed("ArrowUp") + keyboard.pressed("ArrowDown");
	[dx, dy] = (dx !== 0) ? [dx, 0] : [0, dy];
	const nx = this.moveToX / 16 + dx;
	const ny = this.moveToY / 16 + dy;
	const nextTile = mapGet(global.level, nx, ny);
	if ((dx !== 0 || dy !== 0) && nextTile !== -1002 && nextTile !== undefined) {
		next.moveToX = nx * 16;
		next.moveToY = ny * 16;
	}

};

//
playerDog.draw = function() {
	draw$1(sprUnitShadow, this.x + 2, this.y);
	draw$1(sprPlayerDog, this.x, this.y);
};

//
class CarSpawner extends GameObject {

	//
	constructor(x, y, d) {
		super(null, x, y);
		this.d = d;
		this.timer = 120 + 60 * ~~math.random(5);
		gameObjects.push(this);
	}

	//
	update(dt) {
		if (this.timer-- <= 0) {
			this.timer = 140 + 80 * ~~math.random(6);
			new Car(this.x, this.y, this.d);
		}
	}

}

//
class Car extends GameObject {

	//
	constructor(x, y, d) {
		super(car[~~math.random(car.length)], x, y, 1);
		this.scaleX = d;
		this.w = 28;
		this.h = 12;
		this.vx = d;
		gameObjects.push(this);
	}

	//
	collides(obj) {
		const x1 = Math.min(this.x, this.x + this.w * this.scaleX);
		const x2 = Math.max(this.x, this.x + this.w * this.scaleX);
		const y1 = Math.min(this.y, this.y + this.h * this.scaleY);
		const y2 = Math.max(this.y, this.y + this.h * this.scaleY);
		if ((x1 > obj.x + obj.w)
		||  (y1 > obj.y + obj.h)
		||  (x2 < obj.x)
		||  (y2 < obj.y))
			return false;
		return true;
	}

	//
	update(dt) {
		super.update(dt);
		if (this.collides(playerDog) || this.collides(playerPerson)) {
			playerDog.hit();
		}
	}

	//
	draw() {
		draw$1(carShadow, this.x + 2, this.y, 0, this.scaleX, 1);
		super.draw();
	}

}

//
function generateMap(map) {

	console.log(global.level, map);

	let hasObjective = false;

	let objective = new GameObject(bone, 0, 0, 1);
	objective.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y) {
			console.log("collected objective");
			audio.play(sndObjectiveGet);
			hasObjective = true;
			gameObjects.splice(gameObjects.indexOf(objective), 1);
		}
	};

	let finish = new GameObject(flag, 0, 0, 1);
	finish.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y
		&&  hasObjective) {
			console.log("level complete");
			audio.play(sndCompleteLevel);
			gameObjects.splice(gameObjects.indexOf(finish), 1);
			gameObjects.length = 0;
			global.level += 1;
			if (global.level >= maps.length) global.level = 0;
			generateMap(maps[global.level]);
		}
	};

	gameObjects.push(objective, finish);

	const level = global.level;
	for (let y = 0; y < map.data.length; y++)
	for (let x = 0; x < 20; x++) {

		const alt = (x + y) % 2;
		const alty = y % 2;

		let frill = true;

		if (mapGet(level, x, y) <= 0 && mapGet(level, x, y+1) === 1)
			gameObjects.push(new GameObject(grassEdge[alt], x*16, y*16));

		else if (mapGet(level, x, y) <= 0)
			gameObjects.push(new GameObject(grass[alt], x*16, y*16));

		// Trees.
		if (mapGet(level, x, y) === -1002) {
			const t = math.choose(0, 1, 2);
			gameObjects.push(new GameObject(tree[t], x*16, y*16, 20 + y / 1e3));
			gameObjects.push(new GameObject(treeShadow[t], x*16, y*16, 1));
			frill = false;
		}

		// Road.
		if (mapGet(level, x, y) === 1) {
			gameObjects.push(new GameObject(road, x*16, y*16));
			frill = false;
			// Road dashes.
			if (mapGet(level, x, y+1) === 1 && (x % 2 === 0))
				gameObjects.push(new GameObject(roadDash, x*16, y*16+8));
			// Car spawners
			if (x-1 < 0 && alty)
				gameObjects.push(new CarSpawner(x*16-32, y*16, 1));
			if (x+1 >= 20 && !alty)
				gameObjects.push(new CarSpawner(x*16+48, y*16, -1));
		}

		// Objective.
		if (mapGet(level, x, y) === -1003) {
			[objective.x, objective.y] = [x * 16, y * 16];
			frill = false;
		}

		// Finish.
		if (mapGet(level, x, y) === -1004) {
			[finish.x, finish.y] = [x * 16, y * 16];
			frill = false;
		}

		// Player dog.
		if (mapGet(level, x, y) === -1000) {
			playerDog.nextMove = {};
			[playerDog.x, playerDog.y] = [x * 16, y * 16];
			[playerDog.startX, playerDog.startY] = [x * 16, y * 16];
			[playerDog.moveToX, playerDog.moveToY] = [x * 16, y * 16];
		}

		// Player person.
		if (mapGet(level, x, y) === -1001) {
			[playerPerson.x, playerPerson.y] = [x * 16, y * 16];
			[playerPerson.startX, playerPerson.startY] = [x * 16, y * 16];
			[playerPerson.moveToX, playerPerson.moveToY] = [x * 16, y * 16];
		}

		//
		if (frill && Math.random() < 0.1) {
			gameObjects.push(new GameObject(rock[0], x*16, y*16));
		}

	}

	gameObjects.push(playerDog, playerPerson);

}

//
const objMenu = new GameObject(sprTitle, 0, 0, 100);
gameObjects.push(objMenu);

objMenu.update = function() {
	if (keyboard.pressed("Space")) {
		gameObjects.length = 0;
		const map = maps[global.level];
		generateMap(map);
	}
};

objMenu.draw = function() {
	setColor(255, 255, 255, 1);
	setFont("small-caps bold 48px sans-serif");
	setTextAlign("center");
	setTextBaseline("middle");
	print("Guide Dog", 160, 60);
	setFont("small-caps bold 16px sans-serif");
	print("SIMULATOR", 160, 90);
	print("press SPACE to play", 160, 142);
};

//
function startMenu() {

	// Generate a background
	for (let x = 0; x < 20; x++)
	for (let y = 0; y < 12; y++) {
		const alt = (x + y) % 2;
		gameObjects.push(new GameObject(grass[alt], x * 16, y * 16));
	}

}

app.setMode({
	name: "Jamulator 2021",
	fullscreen: true,
	resWidth: 320 * 4,
	resHeight: 180 * 4
});

document.addEventListener("keydown", function(e) {
    if (!audio.isPlaying(sndMusic1)) {
		//game.audio.loop(sndMusic1);
		audio.loop(sndAmbienceCars);
	}
});

startMenu();

const depthSort = (a, b) => a.depth - b.depth;

update((dt) => {
	updateList(gameObjects);
});

draw(() => {
	clear(0, 0, 0);
	gameObjects.sort(depthSort);
	push();
	scale(4, 4);
	if (gameObjects.indexOf(playerDog) !== -1) {
		const map = maps[global.level];
		translate(0, math.clamp(-playerDog.y+90, -map.data.length*16+180, 0));
	}
	drawList(gameObjects);
	pop();
});
