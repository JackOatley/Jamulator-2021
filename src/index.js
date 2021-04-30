import * as game from "./engine/engine.js";
import { audio, graphics, math } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import { global, gameObjects } from "./globals.js";
import { sndMusic1, sndAmbienceCars } from "./resources.js";
import { startMenu } from "./menu.js";

game.app.setMode({
	name: "Jamulator 2021",
	fullscreen: true,
	resWidth: 320 * 4,
	resHeight: 180 * 4
});

document.addEventListener("keydown", function(e) {
    if (!audio.isPlaying(sndMusic1)) {
		//game.audio.loop(sndMusic1);
		//game.audio.loop(sndAmbienceCars);
	}
});

startMenu();

const depthSort = (a, b) => a.depth - b.depth;

game.update((dt) => {
	game.updateList(gameObjects);
});

game.draw(() => {
	graphics.clear(0, 0, 0);
	gameObjects.sort(depthSort);
	graphics.push();
	graphics.scale(4, 4);
	if (gameObjects.indexOf(playerDog) !== -1) {
		const map = maps[global.level];
		graphics.translate(0, math.clamp(-playerDog.y+90, -map.data.length*16+180, 0));
	}
	game.drawList(gameObjects);
	graphics.pop();
});
