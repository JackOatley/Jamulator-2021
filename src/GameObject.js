import * as game from "./engine/engine.js";

//
export class GameObject {

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
		this.img && game.graphics.draw(this.img, this.x, this.y, 0, this.scaleX, this.scaleY);
	}

}
