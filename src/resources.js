import game from "./engine/engine.js";

// Sound assets.
export const sndMusic1 = game.audio.newSound("audio/music1.wav");
export const sndPlayerMove = game.audio.newSound("audio/playerMove.wav", 2);
export const sndObjectiveGet = game.audio.newSound("audio/objectiveGet.wav");
export const sndCompleteLevel = game.audio.newSound("audio/completeLevel.wav");

// Art assets.
export const tiles = game.graphics.newImage("art/tiles.png");
export const grass = [
	game.graphics.newSubImage(tiles, 0, 0, 16, 16),
	game.graphics.newSubImage(tiles, 48, 0, 16, 16)];
export const grassEdge = [
	game.graphics.newSubImage(tiles, 32, 0, 16, 16),
	game.graphics.newSubImage(tiles, 80, 0, 16, 16)];
export const road = game.graphics.newSubImage(tiles, 0, 16, 16, 16);
export const roadDash = game.graphics.newSubImage(tiles, 16, 16, 16, 16, 8, 0);
export const tree = [
	game.graphics.newSubImage(tiles, 0, 32, 16, 32, 0, 18),
	game.graphics.newSubImage(tiles, 16, 32, 16, 32, 0, 18),
	game.graphics.newSubImage(tiles, 32, 32, 16, 32, 0, 18)];
export const treeShadow = [
	game.graphics.newSubImage(tiles, 0, 64, 20, 8, -8, -7),
	game.graphics.newSubImage(tiles, 0, 64, 15, 8, -8, -7),
	game.graphics.newSubImage(tiles, 0, 64, 10, 8, -8, -7)];
export const car = [
	game.graphics.newSubImage(tiles, 0, 72, 32, 16, 0, 4),
	game.graphics.newSubImage(tiles, 32, 72, 32, 16, 0, 4),
	game.graphics.newSubImage(tiles, 64, 72, 32, 16, 0, 4),
	game.graphics.newSubImage(tiles, 96, 72, 32, 16, 0, 4)];
export const carShadow = game.graphics.newSubImage(tiles, 0, 88, 32, 16, 0, 4);

export const bone = game.graphics.newSubImage(tiles, 112, 0, 16, 16);
export const flag = game.graphics.newSubImage(tiles, 112, 16, 16, 16);
