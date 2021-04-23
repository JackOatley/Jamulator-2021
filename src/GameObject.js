import game from "./engine/engine.js";

//
export class GameObject {

	constructor(img, x=0, y=0, depth=0) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.depth = depth;
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
