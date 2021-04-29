import * as game from "./engine/engine.js";
import { graphics } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import {
	sprTitle,
	tiles, grass, grassEdge, road, roadDash,
	tree, treeShadow, rock,
} from "./resources.js";

// First level should always be unlocked.
localStorage.setItem(`gds_level_0_unlock`, true);

//
let selected = 0;

//
const objLevelSelect = new GameObject(null, 0, 0, 100);

objLevelSelect.update = function() {

	// Navigate menu.
	if (game.keyboard.pressed("ArrowRight")) selected = (selected + 1) % 10;
	if (game.keyboard.pressed("ArrowLeft")) selected = (selected + 9) % 10;
	if (game.keyboard.pressed("ArrowUp")) selected = (selected + 15) % 10;
	if (game.keyboard.pressed("ArrowDown")) selected = (selected + 5) % 10;

}

objLevelSelect.draw = function() {
	graphics.setColor(255, 255, 255, 1);
	graphics.setTextAlign("center");
	graphics.setTextBaseline("middle");
	graphics.setFont("small-caps bold 16px sans-serif");
	graphics.print("Select a level:", 160, 32);
}

//
class LevelBox extends GameObject {

	constructor(x, y, id) {
		super(null, x, y);
		this.id = id;
		this.unlock = localStorage.getItem(`gds_level_${id}_unlock`) ?? false;
	}

	update() {

		// Select level.
		if (this.unlock && this.id === selected && game.keyboard.pressed("Space")) {
			gameObjects.length = 0;
			global.level = this.id;
			const map = maps[global.level];
			generateMap(map);
		}

	}

	draw() {
		if (this.unlock) {
			if (selected === this.id) graphics.setColor(255, 255, 255, 1);
			else graphics.setColor(255, 255, 255, 0.5);
		} else {
			if (selected === this.id) graphics.setColor(100, 100, 100, 1);
			else graphics.setColor(100, 100, 100, 0.5);
		}
		graphics.rectangle("fill", this.x, this.y, 32, 32);
		graphics.setColor(0, 0, 0, 1);
		graphics.rectangle("stroke", this.x, this.y, 32, 32);
	}

}

//
export function levelSelect() {

	gameObjects.length = 0;
	gameObjects.push(objLevelSelect);

	// Generate a background
	for (let x = 0; x < 20; x++)
	for (let y = 0; y < 12; y++) {
		const alt = (x + y) % 2;
		gameObjects.push(new GameObject(grass[alt], x * 16, y * 16));
	}

	// Generate a background
	for (let n = 0, y = 0; y < 2; y++)
	for (let x = 0; x < 5; x++, n++) {
		gameObjects.push(new LevelBox(48 + x * 48, 64 + y * 48, n));
	}

}
