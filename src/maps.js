
// 0 = grass
// 1 = trees
const D = -1000;	// Dog
const P = -1001;	// Person
const T = -1002;	// Tree

export const maps = [

	{
		name: "Test Level",
		desc: "Cross the roads, don't get petted, don't let hooman down!",
		data: [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,T,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,T,0,0,T,0,0,0,P,D,0,0,0,0,0,0,0,0,0]
		]
	}

]

//
export function mapGet(map, x, y) {
	y = Math.max(0, Math.min(y, maps[map].data.length-1));
	return maps[map].data[y][x];
}

//
export function mapName(map) {
	return maps[map].name;
}
