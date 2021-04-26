import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import { global, gameObjects } from "./globals.js";
import { sndMusic1 } from "./resources.js";

game.app.setMode({
	name: "Jamulator 2021",
	fullscreen: true,
	resWidth: 320 * 2,
	resHeight: 180 * 2
});

document.addEventListener("keydown", function(e) {
	console.log("play");
    if (!game.audio.isPlaying(sndMusic1)) {
		game.audio.loop(sndMusic1);
	}
});

const map = maps[global.level];
generateMap(map);

const depthSort = (a, b) => a.depth - b.depth;

game.update((dt) => {
	game.updateList(gameObjects);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	gameObjects.sort(depthSort);
	game.graphics.push();
	game.graphics.scale(2, 2);
	game.graphics.translate(0, game.math.clamp(-playerDog.y+90, -map.data.length*16+180, 0));
	game.drawList(gameObjects);
	game.graphics.pop();
});
