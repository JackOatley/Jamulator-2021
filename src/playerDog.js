import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerPerson } from "./playerPerson.js";
import {
	sndPlayerMove
} from "./resources.js";

//
export const playerDog = new GameObject(null, 64, 180-16);

playerDog.depth = 10;
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

}

//
playerDog.draw = function() {
	game.graphics.setColor(255, 0, 0);
	game.graphics.rectangle(this.x+2, this.y+2, 12, 12);
}
