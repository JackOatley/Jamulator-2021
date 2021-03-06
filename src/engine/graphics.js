/*
The grahics module deals with what and how things are drawn to the canvas.
*/

import * as app from "./app.js";

// The current drawning target.
// We use a context for this value as the canvas can be derived from that but
// not as easily the other way around.
let target = app.ctx;


//------------------------------------------------------------------------------
// Loading.
//------------------------------------------------------------------------------

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
	return { img: img, x: x, y: y, w: w, h: h, ox: ox, oy: oy }
}


//------------------------------------------------------------------------------
// Drawing.
//------------------------------------------------------------------------------

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
	translate(x - i.ox * sx, y - i.oy * sy);
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
export function points(...c) {
	const len = ~~(c.length / 2) * 2;
	if (len < 2) return;
	target.beginPath();
	for (let n = 0; n < len;) target.rect(c[n++], c[n++], 1, 1);
	target.fill();
}

//
export function rectangle(mode, x, y, w, h) {
	target.beginPath();
	target.rect(x, y, w, h);
	target[mode]();
}

// Draw a circle.
export function circle(mode, x, y, radius) {
	target.beginPath();
	target.arc(x, y, radius, 0, 2 * Math.PI);
	target[mode]();
}


//------------------------------------------------------------------------------
// Text.
//------------------------------------------------------------------------------

// Print text at a given position.
export const print = (text, x, y) => target.fillText(text, x, y);

// Set font from a CSS font shorthand string.
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
export const setFont = (font) => target.font = font;

// Set text alignment.
// Can be; "left", "right", "center", "start", "end".
export const setTextAlign = (x) => target.textAlign = x;

// Set text baseline.
// Can be; "top", "hanging", "middle", "alphabetic", "ideographic", "bottom".
export const setTextBaseline = (x) => target.textBaseline = x;


//------------------------------------------------------------------------------
// State.
//------------------------------------------------------------------------------

// Set the drawing color.
export const setColor = (r, g, b, a=1) => {
	target.strokeStyle = target.fillStyle = `rgba(${r},${g},${b},${a})`;
}


//------------------------------------------------------------------------------
// Transomation.
//------------------------------------------------------------------------------

export const push = () => target.save();
export const pop = () => target.restore();
export const translate = (x, y) => target.translate(x, y);
export const scale = (x, y) => target.scale(x, y);
export const reset = () => target.setTransform(1, 0, 0, 1, 0, 0);
