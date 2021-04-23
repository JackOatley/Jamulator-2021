import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";
import { playerPerson } from "./playerPerson.js";
import {
	tiles, grass, grassEdge, road, roadDash, tree1, tree2
} from "./resources.js";

game.app.setMode({
	name: "Jamulator 2021",
	width: 320 * 4,
	height: 180 * 4,
	resWidth: 320,
	resHeight: 180
});

const gameObjects = [];

// Generate map.
const order = [grass, road, road, grass, road, road, grass, grass, road, road, grass];
const length = order.length * 16;
for (let y = 180 - 16, n = 0; y >= 0; y -= 16, n++) {
	for (let x = 0; x < 640; x += 16) {

		if (order[n] === grass && order[n-1] === road)
			gameObjects.push(new GameObject(grassEdge, x, y));

		else
			gameObjects.push(new GameObject(order[n], x, y));

		// Trees.
		if (order[n] === grass && Math.random() > 0.8) {
			const t = game.math.choose(tree1, tree2);
			gameObjects.push(new GameObject(t, x, y, 20 + y / 1000));
		}

		// Road dashes.
		if (order[n] === road && order[n-1] === road && (x % 32 === 0))
			gameObjects.push(new GameObject(roadDash, x, y + 8));

	}
}

gameObjects.push(playerDog, playerPerson);

function depthSort(a, b) {
	return a.depth - b.depth;
}

game.update((dt) => {
	game.updateList(gameObjects);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	gameObjects.sort(depthSort);
	game.drawList(gameObjects);
});
