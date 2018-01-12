import { generateMaze, getEmptyMaze } from "./maze";

const emptyMazeTestCases = [
	{ width: 1, height: 1 },
	{ width: 2, height: 1 },
	{ width: 10, height: 10 },
	{ width: 1, height: 10 },
	{ width: 100, height: 1 },
];


describe("Maze generator", () => {
	it("#getEmptyMaze should return empty maze template", () => {
		emptyMazeTestCases.forEach(( { width, height } ) => {

			const maze = getEmptyMaze(width, height);

			expect(maze.length).toEqual(width);
			maze.forEach(( mazeColumn, i ) => {
				expect(mazeColumn.length).toEqual(height);
				mazeColumn.forEach(( cell, j ) => {
					expect(cell).toEqual({
						x           : i,
						y           : j,
						visitedCount: 0,
						walls       : { left: 1, right: 1, top: 1, bottom: 1 }
					});
				})
			})

		});
	});

	it('#generateMaze should return generated maze cells', () => {
		emptyMazeTestCases.forEach(( desc ) => {
			expect(generateMaze(desc).length).toEqual(desc.width * desc.height);
		});
	});

	it('#generateMaze should have custom start cell', () => {
		expect(generateMaze({ width: 10, height: 10, startX: 5, startY: 7 })[ 0 ].x).toEqual(5);
		expect(generateMaze({ width: 10, height: 10, startX: 5, startY: 7 })[ 0 ].y).toEqual(7);

		expect(generateMaze({ width: 10, height: 10, startX: 15 })[ 0 ].x).toEqual(9);
		expect(generateMaze({ width: 10, height: 10, startX: -15 })[ 0 ].x).toEqual(0);
		expect(generateMaze({ width: 10, height: 10, startY: 15 })[ 0 ].y).toEqual(9);
		expect(generateMaze({ width: 10, height: 10, startY: -15 })[ 0 ].y).toEqual(0);
	});

	it('#generateMaze all maze cells should be open', () => {
		const maze = generateMaze({ width: 10, height: 10, startX: 5, startY: 7 });
		maze.forEach(( cell ) => {
			const currWalls = cell.walls;
			expect(currWalls.top || currWalls.bottom || currWalls.left || currWalls.right).toEqual(1);
			expect(cell.visitedCount).toEqual(1);
		});
	})


});