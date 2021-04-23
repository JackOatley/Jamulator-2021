import game from "./engine/engine.js";
import { GameObject } from "./GameObject.js";
import { playerDog } from "./playerDog.js";

game.app.setMode({
	name: "Jamulator 2021",
	width: 320 * 4,
	height: 180 * 4,
	resWidth: 320,
	resHeight: 180
});

const tiles = game.graphics.newImage("art/tiles.png");
const grass = game.graphics.newSubImage(tiles, 0, 0, 16, 16);
const grassEdge = game.graphics.newSubImage(tiles, 32, 0, 16, 16);
const road = game.graphics.newSubImage(tiles, 0, 16, 16, 16);
const roadDash = game.graphics.newSubImage(tiles, 16, 16, 16, 16, 8, 0);

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

		if (order[n] === road && order[n-1] === road && (x % 32 === 0))
			gameObjects.push(new GameObject(roadDash, x, y + 8));

	}
}

gameObjects.push(playerDog);

game.update((dt) => {
	game.updateList(gameObjects);
});

game.draw(() => {
	game.graphics.clear(0, 0, 0);
	game.drawList(gameObjects);
});
