import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps, mapGet } from "./maps.js";
import { global } from "./globals.js";
import {
	tiles, grass, grassEdge, road, roadDash,
	tree1, tree1Shadow, tree2, tree2Shadow,
	bone, flag, sndCompleteLevel, sndObjectiveGet
} from "./resources.js";

//
export function generateMap(gameObjects, map) {

	console.log(global.level, map);

	let hasObjective = false;

	let objective = new GameObject(bone, 0, 0, 1);
	objective.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y) {
			console.log("collected objective");
			game.audio.play(sndObjectiveGet);
			hasObjective = true;
			gameObjects.splice(gameObjects.indexOf(objective), 1);
		}
	}

	let finish = new GameObject(flag, 0, 0, 1);
	finish.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y
		&&  hasObjective) {
			console.log("level complete");
			game.audio.play(sndCompleteLevel);
			gameObjects.splice(gameObjects.indexOf(finish), 1);
			gameObjects.length = 0;
			global.level += 1;
			if (global.level >= maps.length) global.level = 0;
			generateMap(gameObjects, maps[global.level]);
		}
	}

	gameObjects.push(objective, finish);

	for (let y = 0; y < map.data.length; y++)
	for (let x = 0; x < 20; x++) {

		const alt = (x + y) % 2;

		if (mapGet(global.level, x, y) <= 0 && mapGet(global.level, x, y+1) === 1)
			gameObjects.push(new GameObject(grassEdge[alt], x*16, y*16));

		else if (mapGet(global.level, x, y) <= 0)
			gameObjects.push(new GameObject(grass[alt], x*16, y*16));

		// Trees.
		if (mapGet(global.level, x, y) === -1002) {
			const t = game.math.choose(tree1, tree2);
			gameObjects.push(new GameObject(t, x*16, y*16, 20 + y / 1000));
			if (t === tree1) gameObjects.push(new GameObject(tree1Shadow, x*16, y*16, 1));
			if (t === tree2) gameObjects.push(new GameObject(tree2Shadow, x*16, y*16, 1));
		}

		// Road dashes.
		if (mapGet(global.level, x, y) === 1) {
			gameObjects.push(new GameObject(road, x*16, y*16));
			if (mapGet(global.level, x, y+1) === 1 && (x % 2 === 0))
				gameObjects.push(new GameObject(roadDash, x*16, y*16+8));
		}

		// Objective.
		if (mapGet(global.level, x, y) === -1003) {
			[objective.x, objective.y] = [x * 16, y * 16];
		}

		// Finish.
		if (mapGet(global.level, x, y) === -1004) {
			[finish.x, finish.y] = [x * 16, y * 16];
		}

		// Player dog.
		if (mapGet(global.level, x, y) === -1000) {
			[playerDog.x, playerDog.y] = [x * 16, y * 16];
			[playerDog.moveToX, playerDog.moveToY] = [x * 16, y * 16];
		}

		// Player person.
		if (mapGet(global.level, x, y) === -1001) {
			[playerPerson.x, playerPerson.y] = [x * 16, y * 16];
			[playerPerson.moveToX, playerPerson.moveToY] = [x * 16, y * 16];
		}

	}

	gameObjects.push(playerDog, playerPerson);

}
