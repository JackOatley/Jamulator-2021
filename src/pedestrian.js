import * as game from "./engine/engine.js";
import { audio, graphics} from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { pedestrian, sprUnitShadow, sndDogPetted } from "./resources.js";

//
export class PedestrianSpawner extends GameObject {

	//
	constructor(x, y, d) {
		super(null, x, y);
		this.d = d;
		this.timer = 140 + 60 * ~~game.math.random(5);
		gameObjects.push(this);
	}

	//
	update(dt) {
		if (this.timer-- <= 0) {
			this.timer = 140 + 80 * ~~game.math.random(20);
			new Pedestrian(this.x, this.y, this.d);
		}
	}

}

//
export class Pedestrian extends GameObject {

	//
	constructor(x, y, d) {
		super(pedestrian[~~game.math.random(pedestrian.length)], x, y, 1);
		this.scaleX = d;
		this.w = 12;
		this.h = 12;
		this.vx = d / 2;
		this.offset = Math.random() * 8;
		gameObjects.push(this);
	}

	//
	collides(obj) {
		const x1 = Math.min(this.x - 4, this.x + 4 * this.scaleX);
		const x2 = Math.max(this.x - 4, this.x + 4 * this.scaleX);
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
		this.depth = 20 + (this.y - this.offset) / 16 / 1e3;
		if (this.x < -100 || this.x > 420) this.destroy();
		if (this.collides(playerDog)) {
			audio.play(sndDogPetted);
			playerDog.hit();
		}

		// Sees doggy!
		if (Math.abs(playerDog.y - this.y) < 8) {
			if (playerDog.x < this.x && this.vx < 0) {
				this.vx = Math.sign(this.vx) * 2;
			}
			if (playerDog.x > this.x && this.vx > 0) {
				this.vx = Math.sign(this.vx) * 2;
			}
		}

	}

	//
	draw() {
		//game.graphics.draw(carShadow, this.x + 2, this.y, 0, this.scaleX, 1);
		//super.draw();
		graphics.draw(sprUnitShadow, this.x - 8, this.y - this.offset + 2);
		const y = this.y - this.offset + Math.abs(Math.sin(this.offset + performance.now() / 75) * 2);
		graphics.draw(this.img, this.x, y, 0, this.scaleX, 1)
	}

	//
	destroy() {
		const i = gameObjects.indexOf(this);
		if (i >= 0) gameObjects.splice(i, 1);
	}

}
