import game from "./engine/engine.js";

game.app.setMode({
	name: "Jamulator 2021",
	width: 640,
	height: 480
});

class Shape {

	constructor() {
		this.x = game.math.random(640);
		this.y = game.math.random(480);
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

	constructor() {
		super();
		this.radius = game.math.random(20, 70);
	}

	draw() {
		super.draw();
		game.graphics.circle(this.x, this.y, this.radius);
	}

}

class Rectangle extends Shape {

	constructor() {
		super();
		this.size = game.math.random(20, 70);
	}

	draw() {
		super.draw();
		game.graphics.rectangle(this.x, this.y, this.size, this.size);
	}

}

const circles = [];
for (let n = 0; n < 100; n++) {
	const c = ~~game.math.random(2) ? Circle : Rectangle;
	circles.push(new c());
}

game.update((dt) => {
	game.updateList(circles);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	game.drawList(circles);
	game.graphics.setColor(255, 255, 255, 1);
	game.graphics.setTextAlign("center");
	game.graphics.setTextBaseline("middle");
	game.graphics.setFont("italic small-caps bold 64px cursive");
	game.graphics.print("Hello, world!", 320, 240);
});
