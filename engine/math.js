
//
export function choose(...args) {
	return args[~~random(args.length)];
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
	random: random
}
