import { generateMaze } from "../utils/maze";
import { renderMazeCanvas } from "./canvasRenderer";

describe('Canvas maze renderer', () => {

	it('#generateMaze should create canvas', () => {
		const mazeContainer = document.body.appendChild(document.createElement('div'));
		const maze = generateMaze({ width: 10, height: 10 });
		renderMazeCanvas(maze, mazeContainer);
		expect(mazeContainer.querySelector('canvas')).not.toBe(null);
	})
});