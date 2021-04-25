import game from "./engine/engine.js";
import { global } from "./globals.js";
import { GameObject } from "./GameObject.js";
import { playerPerson } from "./playerPerson.js";
import { maps, mapGet } from "./maps.js";
import {
	sndPlayerMove
} from "./resources.js";

//
export const playerDog = new GameObject(null, 64, 180-16);

playerDog.isHit = false;
playerDog.startX = 0;
playerDog.startY = 0;
playerDog.w = 12;
playerDog.h = 12;
playerDog.depth = 10;
playerDog.moveToX = playerDog.x;
playerDog.moveToY = playerDog.y;
playerDog.nextMove = {};

//
playerDog.hit = function() {
	if (!playerDog.isHit) {
		playerDog.isHit = playerDog.isHit = true;
		playerDog.moveToX = playerDog.startX;
		playerDog.moveToY = playerDog.startY;
		playerPerson.moveToX = playerPerson.startX;
		playerPerson.moveToY = playerPerson.startY;
	}
}

//
playerDog.update = function() {

	if (playerDog.isHit) {
		const xd = Math.min(2, game.math.distance(this.x, 0, this.startX, 0));
		const yd = Math.min(2, game.math.distance(0, this.y, 0, this.startY));
		this.x += Math.sign(this.moveToX - this.x) * xd;
		this.y += Math.sign(this.moveToY - this.y) * yd;
		if (this.x === this.startX && this.y === this.startY) {
			this.isHit = false;
		}
		return;
	}

	let next = this;

	if (this.moveToX !== this.x || this.moveToY !== this.y) {
		this.x += Math.sign(this.moveToX - this.x);
		this.y += Math.sign(this.moveToY - this.y);
		next = this.nextMove;
		if (game.math.distance(this.x, this.y, this.moveToX, this.moveToY) === 15) {
			game.audio.play(sndPlayerMove);
			playerPerson.moveToX = this.x;
			playerPerson.moveToY = this.y;
		}
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

	if (game.keyboard.pressed("ArrowUp")
	&& mapGet(global.level, this.moveToX / 16, this.moveToY / 16 - 1) !== -1002) {
		next.moveToX = nowX;
		next.moveToY = nowY - 16;
	}

	if (game.keyboard.pressed("ArrowDown")
	&& mapGet(global.level, this.moveToX / 16, this.moveToY / 16 + 1) !== -1002) {
		next.moveToX = nowX;
		next.moveToY = nowY + 16;
	}

	if (game.keyboard.pressed("ArrowLeft")
	&& mapGet(global.level, this.moveToX / 16 - 1, this.moveToY / 16) !== -1002) {
		next.moveToX = nowX - 16;
		next.moveToY = nowY;
	}

	if (game.keyboard.pressed("ArrowRight")
	&& mapGet(global.level, this.moveToX / 16 + 1, this.moveToY / 16) !== -1002) {
		next.moveToX = nowX + 16;
		next.moveToY = nowY;
	}

}

//
playerDog.draw = function() {
	game.graphics.setColor(255, 0, 0);
	game.graphics.rectangle(this.x+2, this.y+2, 12, 12);
}
