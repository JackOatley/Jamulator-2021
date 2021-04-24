import game from "./engine/engine.js";

// Sound assets.
export const sndPlayerMove = game.audio.newSound("audio/playerMove.wav", 2);

// Art assets.
export const tiles = game.graphics.newImage("art/tiles.png");
export const grass = game.graphics.newSubImage(tiles, 0, 0, 16, 16);
export const grassEdge = game.graphics.newSubImage(tiles, 32, 0, 16, 16);
export const road = game.graphics.newSubImage(tiles, 0, 16, 16, 16);
export const roadDash = game.graphics.newSubImage(tiles, 16, 16, 16, 16, 8, 0);
export const tree1 = game.graphics.newSubImage(tiles, 0, 32, 16, 32, 0, 18);
export const tree2 = game.graphics.newSubImage(tiles, 16, 32, 16, 32, 0, 18);
export const tree1Shadow = game.graphics.newSubImage(tiles, 0, 64, 20, 8, -8, -7);
export const tree2Shadow = game.graphics.newSubImage(tiles, 0, 64, 16, 8, -8, -7);

export const bone = game.graphics.newSubImage(tiles, 112, 0, 16, 16);
export const flag = game.graphics.newSubImage(tiles, 112, 16, 16, 16);
