import * as game from "./engine/engine.js";
import { keyboard, math } from "./engine/engine.js";
import { global } from "./globals.js";
import { GameObject } from "./GameObject.js";
import { playerPerson } from "./playerPerson.js";
import { maps, mapGet } from "./maps.js";
import {
	sprPlayerDog,
	sprUnitShadow,
	sndPlayerWalkGrass,
	sndPlayerWalkAlsphalt,
	sndDogWhimpering
} from "./resources.js";

//
export const playerDog = new GameObject(sprPlayerDog, 64, 180-16);

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
		game.audio.play(sndDogWhimpering);
	}
}

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

	if (this.moveToX !== this.x || this.moveToY !== this.y) {
		if (math.distance(this.x, this.y, this.moveToX, this.moveToY) === 16) {
			if (mapGet(global.level, this.x / 16, this.y / 16) === 1)
				game.audio.play(sndPlayerWalkAlsphalt);
			else
				game.audio.play(sndPlayerWalkGrass);
			playerPerson.moveToX = this.x;
			playerPerson.moveToY = this.y;
		}
		this.x += Math.sign(this.moveToX - this.x);
		this.y += Math.sign(this.moveToY - this.y);
		next = this.nextMove;
	}

	else {
		if (this.nextMove.moveToX !== undefined
		||  this.nextMove.moveToY !== undefined) {
			this.moveToX = this.nextMove.moveToX ?? this.x;
			this.moveToY = this.nextMove.moveToY ?? this.y;
			this.nextMove = {};
		}
	}

	//
	const dx = -keyboard.pressed("ArrowLeft") + keyboard.pressed("ArrowRight");
	const dy = -keyboard.pressed("ArrowUp") + keyboard.pressed("ArrowDown");
	const nx = this.moveToX / 16 + dx;
	const ny = this.moveToY / 16 + dy;
	const nextTile = mapGet(global.level, nx, ny);
	if ((dx !== 0 || dy !== 0) && nextTile !== -1002 && nextTile !== undefined) {
		next.moveToX = nx * 16;
		next.moveToY = ny * 16;
	}

}

//
playerDog.draw = function() {
	game.graphics.draw(sprUnitShadow, this.x + 2, this.y);
	game.graphics.draw(sprPlayerDog, this.x, this.y);
}
