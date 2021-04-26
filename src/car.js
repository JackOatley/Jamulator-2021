import * as game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { car, carShadow } from "./resources.js";

//
export class CarSpawner extends GameObject {

	//
	constructor(x, y, d) {
		super(null, x, y);
		this.d = d;
		this.timer = 120 + 60 * ~~game.math.random(5);
		gameObjects.push(this);
	}

	//
	update(dt) {
		if (this.timer-- <= 0) {
			this.timer = 140 + 80 * ~~game.math.random(6);
			const car = new Car(this.x, this.y, this.d);
		}
	}

}

//
export class Car extends GameObject {

	//
	constructor(x, y, d) {
		super(car[~~game.math.random(car.length)], x, y, 1);
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
		game.graphics.draw(carShadow, this.x + 2, this.y, 0, this.scaleX, 1);
		super.draw();
	}

}
