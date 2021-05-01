import * as game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { sprPlayerHuman, sprUnitShadow } from "./resources.js";

//
export const playerPerson = new GameObject(sprPlayerHuman, 64-16, 180-16);

playerPerson.isHit = false;
playerPerson.startX = 0;
playerPerson.startY = 0;
playerPerson.w = 12;
playerPerson.h = 12;
playerPerson.depth = 10;
playerPerson.moveToX = playerPerson.x;
playerPerson.moveToY = playerPerson.y;
playerPerson.nextMove = {};

//
playerPerson.update = function() {

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

	const xdiff = Math.sign(this.moveToX - this.x);
	if (xdiff !== 0) this.scaleX = xdiff;
	this.x += Math.sign(this.moveToX - this.x);
	this.y += Math.sign(this.moveToY - this.y);

	this.depth = 20 + this.y / 16 / 1e3;

}

//
playerPerson.draw = function() {
	game.graphics.draw(sprUnitShadow, this.x, this.y);
	game.graphics.draw(sprPlayerHuman, this.x + 8, this.y, 0, this.scaleX);
}
