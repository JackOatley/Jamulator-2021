
// 0 = grass
// 1 = trees
const D = -1000;	// Dog
const P = -1001;	// Person
const T = -1002;	// Tree
const X = -1003;	// Objective/target
const F = -1004;	// Finish (once you get objective)

export const maps = [

	{
		name: "The Park",
		desc: "",
		data: [
			[T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
			[T,T,T,T,0,0,0,0,T,T,0,0,0,T,T,T,T,T,T,T],
			[T,T,0,0,0,0,0,0,T,0,0,0,0,0,0,0,0,T,T,T],
			[T,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,F,0,P,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,0,0,D,0,0,0,0,0,0,0,0,0,0,0,X,0,T,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0,T,T,T],
			[T,T,0,0,0,0,0,0,T,0,0,0,0,0,T,T,0,T,T,T],
			[T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T]
		]
	}, {
		name: "Footpath",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,X,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,T,0,0,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Single Lane",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,X,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,T,0,0,T,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Double Lane",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,X,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[T,T,T,T,T,T,0,0,T,T,T,T,T,0,0,0,T,T,T,T],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Country Lane",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,X,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Highstreet",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,X,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Motorway",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,X,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[T,0,T,0,0,T,0,0,0,T,T,0,0,0,T,0,0,T,0,T],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Pedestrian Zone",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,X,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[T,0,T,T,T,0,0,0,0,0,0,0,0,0,T,0,0,0,T,T],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Highway To Heaven",
		desc: "",
		data: [
			[0,0,0,0,0,0,0,T,0,0,T,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,T,0,0,0,0,X,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,F,0,0,0,0,0,0,0,0,0,0,0,0,T],
			[T,0,0,0,0,0,P,D,0,0,0,0,0,0,0,0,0,0,0,0],
			[T,T,0,0,0,0,0,0,0,0,0,0,0,T,0,0,0,0,0,0]
		]
	}, {
		name: "Amazing",
		desc: "",
		data: [
			[T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
			[T,0,F,0,0,0,0,0,0,0,T,0,0,T,T,T,0,0,T,T],
			[T,0,0,0,T,T,T,T,T,0,0,0,0,T,0,0,0,0,0,T],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[T,T,T,T,T,T,T,T,0,T,T,0,0,0,0,T,0,0,T,T],
			[T,T,0,0,0,0,0,T,T,T,T,T,T,T,T,T,0,0,T,T],
			[T,0,0,T,T,T,0,0,0,0,0,0,T,0,0,0,0,0,0,T],
			[T,T,0,0,0,T,T,T,T,T,T,0,T,0,T,T,T,0,T,T],
			[T,0,0,T,0,0,0,T,T,T,0,0,T,0,0,0,T,0,0,T],
			[T,T,T,T,T,0,T,T,T,T,T,0,T,T,0,T,T,T,T,T],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[T,T,T,0,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
			[T,0,0,0,0,0,0,0,0,0,0,0,0,0,T,0,0,X,0,T],
			[T,T,0,0,0,0,P,D,0,0,0,0,T,0,0,0,0,0,0,T],
			[T,T,0,0,0,0,0,0,0,0,0,0,T,T,T,T,T,T,T,T]
		]
	}

]

//
export const mapGet = (map, x, y) => maps[map].data[y]?.[x];

//
export const mapName = (map) => maps[map].name;
