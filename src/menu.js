import { audio, graphics, keyboard } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { global, gameObjects } from "./globals.js";
import { maps } from "./maps.js";
//import { generateMap } from "./generateMap.js";
import { levelSelect } from "./levelSelect.js";
import {
	sprTitle, grass, sndAmbienceCars, sndMusic1, sndMusic2
} from "./resources.js";

//
const objMenu = new GameObject(sprTitle, 0, 0, 100);

objMenu.update = function() {
	if (keyboard.pressed("Space")) {
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

	//
	audio.stop(sndAmbienceCars);
	if (audio.isPlaying(sndMusic1)) audio.stop(sndMusic1);
	if (!audio.isPlaying(sndMusic2)) audio.loop(sndMusic2);

	// Generate a background
	for (let x = 0; x < 20; x++)
	for (let y = 0; y < 12; y++) {
		const alt = (x + y) % 2;
		gameObjects.push(new GameObject(grass[alt], x * 16, y * 16));
	}

	gameObjects.push(objMenu);

}
