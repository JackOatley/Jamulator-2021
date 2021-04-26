
// Create a new sound from the given src (url to file). "n" let's us specify how many instances of this sound should be generated, if we need to play multiple of the same sound at once.
export function newSound(src, n=1) {

	const instances = [new Audio()];
	instances[0].src = src;

	// Create multiple instances so we can play the same sound multiple times.
	for (; n > 1; n--) {
		instances.push(instances[0].cloneNode());
	}

	return {
		instances: instances
	};

}

// Plays a given sound. The function loops through all instances of the sound to find one that isn't playing, and plays it.
export function play(sound) {
	for (let n = 0; n < sound.instances.length; n++) {
		if (sound.instances[n].paused) {
			return sound.instances[n].play();
		}
	}
	return null;
}

//
export function loop(sound) {
	if (sound.instances[0].paused) {
		sound.instances[0].loop = true;
		return sound.instances[0].play();
	}
}

//
export function isPlaying(sound) {
	return !sound.instances[0].paused;
}

//
export default {
	newSound: newSound,
	play: play,
	loop: loop,
	isPlaying: isPlaying
}
