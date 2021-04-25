import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";

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
		super(null, x, y, 1);
		this.w = 28;
		this.h = 12;
		this.vx = d;
		gameObjects.push(this);
	}

	//
	collides(obj) {
		if ((this.x > obj.x + obj.w)
		||  (this.y > obj.y + obj.h)
		||  (this.x + this.w < obj.x)
		||  (this.y + this.h < obj.y))
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
		game.graphics.setColor(0, 0, 255, 1);
		game.graphics.rectangle(this.x+2, this.y+2, 28, 12);
	}

}
