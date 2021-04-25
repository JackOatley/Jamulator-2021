import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import { global, gameObjects } from "./globals.js";

game.app.setMode({
	name: "Jamulator 2021",
	fullscreen: true,
	resWidth: 320,
	resHeight: 180
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
	game.graphics.translate(0, game.math.clamp(-playerDog.y+90, -map.data.length*16+180, 0));
	game.drawList(gameObjects);
	game.graphics.pop();
});
