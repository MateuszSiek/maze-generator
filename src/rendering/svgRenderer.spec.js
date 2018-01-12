import { generateMaze } from "../utils/maze";
import { getMazeSquare, renderMazeSvg } from "./svgRenderer";

describe("Svg maze renderer", () => {

	describe('#renderMazeSvg', () => {
		const mazeContainer = document.body.appendChild(document.createElement('div'));
		const maze = generateMaze({ width: 10, height: 10 });

		beforeEach(() => {
			mazeContainer.innerHTML = '';
		});


		it('should render maze', () => {
			renderMazeSvg(maze, mazeContainer);
			const mazeSquares = mazeContainer.querySelectorAll('.mg-cell');
			expect(mazeSquares.length).toEqual(100);
		});

		it('each maze cell should have at least 1 wall', () => {
			renderMazeSvg(maze, mazeContainer);
			const mazeSquares = mazeContainer.querySelectorAll('.mg-cell');
			mazeSquares.forEach(( cell ) => {
				const cellLines = cell.querySelectorAll('line');
				expect(cellLines.length).toBeGreaterThan(0);
			});
		});
	})


	describe('#getMazeSquare', () => {
		it('should return maze cell with all walls', () => {
			const square1 = getMazeSquare({ top: 1, bottom: 1, left: 1, right: 1 }, 10);
			expect(square1.querySelectorAll('line').length).toEqual(4);
			const square2 = getMazeSquare({ top: 0, bottom: 1, left: 1, right: 1 }, 10);
			expect(square2.querySelectorAll('line').length).toEqual(3);
			const square3 = getMazeSquare({ top: 0, bottom: 0, left: 1, right: 1 }, 10);
			expect(square3.querySelectorAll('line').length).toEqual(2);
			const square4 = getMazeSquare({ top: 0, bottom: 0, left: 0, right: 1 }, 10);
			expect(square4.querySelectorAll('line').length).toEqual(1);
			const square5 = getMazeSquare({ top: 0, bottom: 0, left: 0, right: 0 }, 10);
			expect(square5.querySelectorAll('line').length).toEqual(0);
		});
	})
});