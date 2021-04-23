import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";

//
export const playerPerson = new GameObject(null, 64-16, 180-16);

playerPerson.depth = 10;
playerPerson.moveToX = playerPerson.x;
playerPerson.moveToY = playerPerson.y;
playerPerson.nextMove = {};

//
playerPerson.update = function() {

	let next = this;

	if (this.moveToX !== this.x || this.moveToY !== this.y) {
		this.x += Math.sign(this.moveToX - this.x);
		this.y += Math.sign(this.moveToY - this.y);
		next = this.nextMove;
	}

}

//
playerPerson.draw = function() {
	game.graphics.setColor(255, 100, 100);
	game.graphics.rectangle(this.x+2, this.y+2, 12, 12);
}
