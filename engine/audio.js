
//
export function newSound(src) {

	const instances = [new Audio()];
	const audio = new Audio();
	instances[0].src = src;

	// Create multiple instances so we can play the same sound multiple times.
	for (let n = 0; n < 10; n++) {
		instances.push(instances[0].cloneNode());
	}

	return {
		instances: instances
	};

}

//
export function play(sound) {
	for (let n = 0; n < 11; n++) {
		if (sound.instances[n].paused) {
			return sound.instances[n].play();
		}
	}
	return null;
}

//
export default {
	newSound: newSound,
	play: play
}
