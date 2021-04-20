/*
The app module deals with the browser/window, such as; size, positioning, resolution and other rendering settings.
*/

// Set up the main app canvas.
export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
    e.stopPropagation();
});

// Set various properties of the window.
export function setMode(opts) {
	document.title = opts.name || document.title;
	canvas.width = opts.width || canvas.width;
	canvas.height = opts.height || canvas.height;
}

//
export default {
	canvas: canvas,
	ctx: ctx,
	setMode: setMode
}
