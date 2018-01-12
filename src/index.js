import { renderMazeSvg } from './rendering/svgRenderer';
import { renderMazeCanvas } from './rendering/canvasRenderer';
import { generateMaze } from "./utils/maze";
import { D_CELL_SIZE, D_X_COUNT, D_X_START, D_Y_COUNT, D_Y_START } from "./utils/defaults";


export class MazeGenerator extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		const mazeWidth = Number(this.dataset.xCount) || D_X_COUNT;
		const mazeHeight = Number(this.dataset.yCount) || D_Y_COUNT;
		const startX = Number(this.dataset.xStart) || D_X_START;
		const startY = Number(this.dataset.yStart) || D_Y_START;
		const cellSize = Number(this.dataset.cellSize) || D_CELL_SIZE;
		const animate = this.dataset.animate === 'true';
		const maze = generateMaze({
			width : mazeWidth,
			height: mazeHeight,
			startX, startY
		});
		const div = document.createElement('span');
		// div.style.display = 'inline-block';
		console.log(maze);
		if ( this.dataset.graphicType === 'raster' ) {
			renderMazeCanvas(maze, div, { cellSize, animate });
		}
		else {
			renderMazeSvg(maze, div, { cellSize, animate });
		}
		this.appendChild(div);
	}
}

customElements.define('maze-generator', MazeGenerator);