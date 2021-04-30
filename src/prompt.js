import * as game from "./engine/engine.js";
import { graphics } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import { startMenu } from "./menu.js";
import {
	sprTitle,
	tiles, grass, grassEdge, road, roadDash,
	tree, treeShadow, rock,
} from "./resources.js";

//
export class Prompt extends GameObject {

	constructor() {
		super();
		this.x = 320 / 2;
		this.y = 180 / 2;
		this.depth = 1e4;
		gameObjects.push(this);
	}

	update() {

		if (game.keyboard.pressed("Space")) {
			gameObjects.length = 0;
			global.level += 1;
			if (global.level >= maps.length) global.level = 0;
			return generateMap(maps[global.level]);
		}

		if (game.keyboard.pressed("Escape")) {
			gameObjects.length = 0;
			global.level = 0;
			return startMenu();
		}

	}

	draw() {
		graphics.push();
		graphics.reset();
		graphics.scale(4, 4);
		graphics.setColor(255, 255, 255, 1);
		graphics.rectangle("fill", this.x - 100, this.y - 50, 200, 100);
		graphics.setColor(0, 0, 0, 1);
		graphics.rectangle("stroke", this.x - 100, this.y - 50, 200, 100);

		graphics.setFont("small-caps bold 24px sans-serif");
		graphics.setTextAlign("center");
		graphics.setTextBaseline("middle");
		graphics.print("Level Completed!", this.x, this.y - 24);

		graphics.setFont("small-caps bold 12px sans-serif");
		graphics.print("SPACE to continue", this.x, this.y + 8);
		graphics.print("ESC to return to menu", this.x, this.y + 24);

		graphics.pop();
	}

}
