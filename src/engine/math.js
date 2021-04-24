
//
export const choose = (...args) => args[~~random(args.length)];

//
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//
export function distance(x1, y1, x2, y2) {
	const x = x1 - x2, y = y1 - y2;
	return Math.sqrt(x * x + y * y);
}

//
export function random(x, y) {
	switch (arguments.length) {
		case (1): return Math.random() * x;
		case (2): return x + Math.random() * (y - x);
		default: return Math.random();
	}
}

//
export default {
	choose: choose,
	clamp: clamp,
	distance: distance,
	random: random
}
