import * as game from "./engine/engine.js";
import { graphics } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { maps } from "./maps.js";
//import { generateMap } from "./generateMap.js";
import { levelSelect } from "./levelSelect.js";
import {
	sprTitle,
	tiles, grass, grassEdge, road, roadDash,
	tree, treeShadow, rock,
} from "./resources.js";

//
const objMenu = new GameObject(sprTitle, 0, 0, 100);
gameObjects.push(objMenu);

objMenu.update = function() {
	if (game.keyboard.pressed("Space")) {
		gameObjects.length = 0;
		levelSelect();
	}
}

objMenu.draw = function() {
	graphics.setColor(255, 255, 255, 1);
	graphics.setFont("small-caps bold 48px sans-serif");
	graphics.setTextAlign("center");
	graphics.setTextBaseline("middle");
	graphics.print("Guide Dog", 160, 60);
	graphics.setFont("small-caps bold 16px sans-serif");
	graphics.print("SIMULATOR", 160, 90);
	graphics.print("press SPACE to play", 160, 142);
}

//
export function startMenu() {

	// Generate a background
	for (let x = 0; x < 20; x++)
	for (let y = 0; y < 12; y++) {
		const alt = (x + y) % 2;
		gameObjects.push(new GameObject(grass[alt], x * 16, y * 16));
	}

}
