import { MazeGenerator } from "./index";

describe('MazeGenerator', () => {
	const container = document.createElement('div');
	document.body.appendChild(container);

	it('should create maze', () => {
		const mazeGenerator = new MazeGenerator();
		container.appendChild(mazeGenerator);
		expect(container.querySelectorAll('svg').length).toEqual(1);
	});

})