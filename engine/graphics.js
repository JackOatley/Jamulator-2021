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
export function setColor(r, g, b, a) {
	target.strokeStyle = target.fillStyle = `rgba(${r},${g},${b},${a})`;
}

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

//
export default {
	circle: circle,
	clear: clear,
	print: print,
	rectangle: rectangle,
	setColor: setColor,
	setFont: setFont,
	setTextAlign: setTextAlign,
	setTextBaseline: setTextBaseline
}
