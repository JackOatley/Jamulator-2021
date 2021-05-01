import { audio, math } from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import { maps, mapGet } from "./maps.js";
import { global, gameObjects } from "./globals.js";
import { CarSpawner } from "./car.js";
import { PedestrianSpawner } from "./pedestrian.js";
import { Prompt } from "./prompt.js";
import {
	tiles, grass, pavement, grassEdge, road, roadDash,
	tree, treeShadow, rock,
	bone, flag, sndCompleteLevel, sndObjectiveGet, sndDogBark,
	sndAmbienceCars, sndMusic1, sndMusic2
} from "./resources.js";

//
export function generateMap(map) {

	localStorage.setItem(`gds_level_${global.level}_unlock`, true);

	let hasObjective = false;
	let hasRoads = false;

	let objective = new GameObject(bone, 0, 0, 1);
	objective.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y) {
			audio.play(sndObjectiveGet);
			hasObjective = true;
			gameObjects.splice(gameObjects.indexOf(objective), 1);
		}
	}

	let finish = new GameObject(flag, 0, 0, 1);
	finish.update = function() {
		if (this.x === playerDog.x
		&&  this.y === playerDog.y
		&&  hasObjective) {
			audio.play(sndDogBark);
			audio.play(sndCompleteLevel);
			gameObjects.splice(gameObjects.indexOf(finish), 1);
			new Prompt();
		}
	}

	gameObjects.push(objective, finish);

	const level = global.level;
	for (let y = 0; y < map.data.length; y++)
	for (let x = 0; x < 20; x++) {

		const alt = (x + y) % 2;
		const alty = y % 2;

		let frill = true;

		if (mapGet(level, x, y) <= 0 && mapGet(level, x, y+1) === 1
		||  mapGet(level, x, y) <= 0 && mapGet(level, x, y+1) === 2)
			gameObjects.push(new GameObject(grassEdge[alt], x*16, y*16));

		else if (mapGet(level, x, y) <= 0)
			gameObjects.push(new GameObject(grass[alt], x*16, y*16));

		// Trees.
		if (mapGet(level, x, y) === -1002) {
			const t = math.choose(0, 1, 2);
			gameObjects.push(new GameObject(tree[t], x*16, y*16, 20 + y / 1e3));
			gameObjects.push(new GameObject(treeShadow[t], x*16, y*16, 1));
			frill = false;
		}

		// Pavement.
		if (mapGet(level, x, y) === 2) {
			gameObjects.push(new GameObject(pavement, x*16, y*16));
			frill = false;

			// Pedestrian spawners.
			if (x-1 < 0)
				gameObjects.push(new PedestrianSpawner(x*16-32, y*16, 1));
			if (x+1 >= 20)
				gameObjects.push(new PedestrianSpawner(x*16+48, y*16, -1));
		}

		// Road.
		if (mapGet(level, x, y) === 1) {
			hasRoads = true;
			gameObjects.push(new GameObject(road, x*16, y*16));
			frill = false;
			// Road dashes.
			if (mapGet(level, x, y+1) === 1 && (x % 2 === 0))
				gameObjects.push(new GameObject(roadDash, x*16, y*16+8));
			// Car spawners
			if (x-1 < 0 && alty)
				gameObjects.push(new CarSpawner(x*16-32, y*16, 1));
			if (x+1 >= 20 && !alty)
				gameObjects.push(new CarSpawner(x*16+48, y*16, -1));
		}

		// Objective.
		if (mapGet(level, x, y) === -1003) {
			[objective.x, objective.y] = [x * 16, y * 16];
			frill = false;
		}

		// Finish.
		if (mapGet(level, x, y) === -1004) {
			[finish.x, finish.y] = [x * 16, y * 16];
			frill = false;
		}

		// Player dog.
		if (mapGet(level, x, y) === -1000) {
			playerDog.nextMove = {};
			[playerDog.x, playerDog.y] = [x * 16, y * 16];
			[playerDog.startX, playerDog.startY] = [x * 16, y * 16];
			[playerDog.moveToX, playerDog.moveToY] = [x * 16, y * 16];
		}

		// Player person.
		if (mapGet(level, x, y) === -1001) {
			[playerPerson.x, playerPerson.y] = [x * 16, y * 16];
			[playerPerson.startX, playerPerson.startY] = [x * 16, y * 16];
			[playerPerson.moveToX, playerPerson.moveToY] = [x * 16, y * 16];
		}

		//
		if (frill && Math.random() < 0.1) {
			gameObjects.push(new GameObject(rock[0], x*16, y*16));
		}

		// Swap music if needed.
		if (audio.isPlaying(sndMusic2)) audio.stop(sndMusic2);
		if (!audio.isPlaying(sndMusic1)) audio.loop(sndMusic1);

		// Play ambience if needed.
		if (hasRoads) audio.loop(sndAmbienceCars);
		else audio.stop(sndAmbienceCars);

	}

	gameObjects.push(playerDog, playerPerson);

}
