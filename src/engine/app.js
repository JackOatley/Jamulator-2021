/*
The app module deals with the browser/window, such as; size, positioning, resolution and other rendering settings.
*/

// Set up the main app canvas.
export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//
let fullscreen = false;

//
canvas.addEventListener("contextmenu", e => {
    e.preventDefault();
    e.stopPropagation();
});

// Set various properties of the window.
export function setMode(opts) {
	document.title = opts.name ?? document.title;
	canvas.width = opts.resWidth ?? canvas.width;
	canvas.height = opts.resHeight ?? canvas.height;
	canvas.style.width = opts.width ?? canvas.width;
	canvas.style.height = opts.height ?? canvas.height;
	fullscreen = opts.fullscreen ?? false;
	if (fullscreen) handleResize();
}

//
function handleResize() {
	if (!fullscreen) return;
	const scale = Math.min(
		window.innerWidth / canvas.width,
		window.innerHeight / canvas.height
	);
	canvas.style.width = canvas.width * scale;
	canvas.style.height = canvas.height * scale;
}

//
window.addEventListener('resize', handleResize);

//
export default {
	canvas: canvas,
	ctx: ctx,
	setMode: setMode
}
