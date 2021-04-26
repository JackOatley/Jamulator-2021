/*
The grahics module deals with what and how things are drawn to the canvas.
*/

import * as app from "./app.js";

// The current drawning target.
// We use a context for this value as the canvas can be derived from that but not as easily the other way around.
let target = app.ctx;

// Draw a circle.
export function circle(x, y, radius) {
	target.beginPath();
	target.arc(x, y, radius, 0, 2 * Math.PI);
	target.fill();
}

// Clear the canvas to a given color (default opaque black).
export function clear(r=0, g=0, b=0, a=1) {
	target.save();
	setColor(r, g, b, a);
	target.fillRect(0, 0, target.canvas.width, target.canvas.height);
	target.restore();
}

// Draw an image, or sub-image (Object) at given position, rotation and scaling.
export function draw(i, x=0, y=0, r=0, sx=1, sy=1) {
	push();
	translate(x - i.ox, y - i.oy);
	scale(sx, sy);
	if (i instanceof Image) return target.drawImage(i, x, y, i.w, i.h);
	target.drawImage(i.img, i.x, i.y, i.w, i.h, 0, 0, i.w, i.h);
	pop();
}

// Draw a line from a variable number of coordinates.
// Each point (coord pair) is connected to the previous point.
export function line(...c) {
	const len = ~~(c.length / 2) * 2;
	if (len < 4) return;
	target.beginPath();
	target.moveTo(c[0], c[1]);
	for (let n = 2; n < len;) target.lineTo(c[n++], c[n++]);
	target.stroke();
}

//
export function newImage(url, ox=0, oy=0) {
	const img = new Image();
	img.src = url;
	img.ox = ox;
	img.oy = oy;
	return img;
}

//
export function newSubImage(img, x, y, w, h, ox=0, oy=0) {
	return {
		img: img,
		x: x, y: y,
		w: w, h: h,
		ox: ox, oy: oy
	}
}

//
export function points(...c) {
	const len = ~~(c.length / 2) * 2;
	if (len < 2) return;
	target.beginPath();
	for (let n = 0; n < len;) target.rect(c[n++], c[n++], 1, 1);
	target.fill();
}

// Print text at a given position.
export function print(text, x, y) {
	target.fillText(text, x, y);
}

//
export function rectangle(x, y, w, h) {
	target.beginPath();
	target.rect(x, y, w, h);
	target.fill();
}

// Set the drawing color.
export function setColor(r, g, b, a=1) {
	target.strokeStyle = target.fillStyle = `rgba(${r},${g},${b},${a})`;
}

//------------------------------------------------------------------------------
// Text.
//------------------------------------------------------------------------------

// Set font from a CSS font shorthand string.
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
export function setFont(font) {
	target.font = font;
}

// Set text alignment.
// Can be; "left", "right", "center", "start", "end".
export function setTextAlign(x) {
	target.textAlign = x;
}

// Set text baseline.
// Can be; "top", "hanging", "middle", "alphabetic", "ideographic", "bottom".
export function setTextBaseline(x) {
	target.textBaseline = x;
}

//------------------------------------------------------------------------------
// Transomation.
//------------------------------------------------------------------------------

//
export const push = () => target.save();

//
export const pop = () => target.restore();

//
export const translate = (x, y) => target.translate(x, y);

//
export const scale = (x, y) => target.scale(x, y);

//
export default {
	circle: circle,
	clear: clear,
	draw: draw,
	line: line,
	newImage: newImage,
	newSubImage: newSubImage,
	points: points,
	print: print,
	rectangle: rectangle,
	setColor: setColor,
	setFont: setFont,
	setTextAlign: setTextAlign,
	setTextBaseline: setTextBaseline,
	push: push,
	pop: pop,
	translate: translate,
	scale: scale
}
