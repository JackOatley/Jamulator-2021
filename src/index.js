import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps } from "./maps.js";
import { generateMap } from "./generateMap.js";
import { global } from "./globals.js";
import {
	tiles, grass, grassEdge, road, roadDash,
	tree1, tree1Shadow, tree2, tree2Shadow,
	bone, flag
} from "./resources.js";

game.app.setMode({
	name: "Jamulator 2021",
	width: 320 * 4,
	height: 180 * 4,
	resWidth: 320,
	resHeight: 180
});

const gameObjects = [];

const map = maps[global.level];
generateMap(gameObjects, map);

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
