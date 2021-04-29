import { graphics, audio } from "./engine/engine.js";

// Sound assets.
export const sndMusic1 = audio.newSound("audio/music1.wav");
export const sndAmbienceCars = audio.newSound("audio/sfx_ambience_cars_ogg.oga");
export const sndPlayerWalkGrass = [
	audio.newSound("audio/sfx_footstep_grass_1.wav", 2),
	audio.newSound("audio/sfx_footstep_grass_2.wav", 2),
	audio.newSound("audio/sfx_footstep_grass_3.wav", 2)];
export const sndPlayerWalkAlsphalt = [
	audio.newSound("audio/sfx_footstep_alsphalt_1.wav", 2),
	audio.newSound("audio/sfx_footstep_alsphalt_2.wav", 2),
	audio.newSound("audio/sfx_footstep_alsphalt_3.wav", 2)];
export const sndDogPetted = audio.newSound("audio/sfx_dog_being_petted.wav");
export const sndDogBark = [
	audio.newSound("audio/sfx_dog_bark_1.wav", 2),
	audio.newSound("audio/sfx_dog_bark_2.wav", 2),
	audio.newSound("audio/sfx_dog_bark_3.wav", 2)];
export const sndDogWhimpering = [
	audio.newSound("audio/sfx_dog_whimpering_1.wav", 2),
	audio.newSound("audio/sfx_dog_whimpering_2.wav", 2),
	audio.newSound("audio/sfx_dog_whimpering_3.wav", 2)];
export const sndObjectiveGet = audio.newSound("audio/sfx_dog_eating.wav");
export const sndCompleteLevel = audio.newSound("audio/completeLevel.wav");

// Art assets.
export const tiles = graphics.newImage("art/tiles.png");
export const sprTitle = graphics.newSubImage(tiles, 0, 192, 256, 64, 128, 32);
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
export const rock = [
	graphics.newSubImage(tiles, 48, 48, 16, 16, 0, 0)];
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
