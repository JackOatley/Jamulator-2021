import { graphics, audio } from "./engine/engine.js";

// Sound assets.
export const sndMusic1 = audio.newSound("audio/music1.wav");
export const sndPlayerMove = audio.newSound("audio/playerMove.wav", 2);
export const sndObjectiveGet = audio.newSound("audio/objectiveGet.wav");
export const sndCompleteLevel = audio.newSound("audio/completeLevel.wav");

// Art assets.
export const tiles = graphics.newImage("art/tiles.png");
export const sprPlayerDog = graphics.newSubImage(tiles, 48, 32, 16, 16, 0, 4);
export const sprPlayerHuman = graphics.newSubImage(tiles, 32, 16, 16, 32, 0, 20);
export const sprUnitShadow = graphics.newSubImage(tiles, 48, 16, 16, 16, 0, 2);
export const grass = [
	graphics.newSubImage(tiles, 0, 0, 16, 16),
	graphics.newSubImage(tiles, 48, 0, 16, 16)];
export const grassEdge = [
	graphics.newSubImage(tiles, 32, 0, 16, 16),
	graphics.newSubImage(tiles, 80, 0, 16, 16)];
export const road = graphics.newSubImage(tiles, 0, 16, 16, 16);
export const roadDash = graphics.newSubImage(tiles, 16, 16, 16, 16, 8, 0);
export const tree = [
	graphics.newSubImage(tiles, 0, 32, 16, 32, 0, 18),
	graphics.newSubImage(tiles, 16, 32, 16, 32, 0, 18),
	graphics.newSubImage(tiles, 32, 48, 16, 16, 0, 2)];
export const treeShadow = [
	graphics.newSubImage(tiles, 0, 64, 20, 8, -8, -7),
	graphics.newSubImage(tiles, 0, 64, 15, 8, -8, -7),
	graphics.newSubImage(tiles, 0, 64, 10, 8, -8, -7)];
export const car = [
	graphics.newSubImage(tiles, 0, 72, 32, 16, 0, 4),
	graphics.newSubImage(tiles, 32, 72, 32, 16, 0, 4),
	graphics.newSubImage(tiles, 64, 72, 32, 16, 0, 4),
	graphics.newSubImage(tiles, 96, 72, 32, 16, 0, 4)];
export const carShadow = graphics.newSubImage(tiles, 0, 88, 32, 16, 0, 4);

export const bone = graphics.newSubImage(tiles, 112, 0, 16, 16);
export const flag = graphics.newSubImage(tiles, 112, 16, 16, 16);
